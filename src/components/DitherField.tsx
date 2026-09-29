import React, { useEffect, useRef } from 'react';

interface DitherFieldProps {
  className?: string;
  fill?: boolean;
  bare?: boolean;
  cell?: number;
  bias?: number;
  calm?: [number, number, number, number]; // [cx, cy, rx, ry]
  interactive?: boolean | 'window';
  children?: React.ReactNode;
}

const VERTEX_SHADER = `
attribute vec2 aPos;
void main() {
  gl_Position = vec4(aPos, 0.0, 1.0);
}
`;

const FRAGMENT_SHADER = `
precision mediump float;
uniform vec2 uSize;      // drawing-buffer size (device px)
uniform float uCell;     // cell size in device px
uniform float uTime;     // seconds
uniform vec3 uInkA;      // accent #0A0B0E
uniform vec3 uInkB;      // paper #EEF0F3
uniform vec4 uCalm;      // cx, cy, rx, ry (fractions of the box); rx=0 disables
uniform vec3 uMouse;     // x, y (uv, GL origin), strength 0..1
uniform float uBias;     // base accent density

float bayer2(vec2 a) {
  a = floor(a);
  return fract(a.x / 2.0 + a.y * a.y * 0.75);
}

float bayer4(vec2 a) {
  return bayer2(0.5 * a) * 0.25 + bayer2(a);
}

float bayer8(vec2 a) {
  return bayer4(0.5 * a) * 0.25 + bayer2(a);
}

void main() {
  vec2 cellCoord = floor(gl_FragCoord.xy / uCell);
  vec2 uv = (cellCoord * uCell) / uSize;
  float aspect = uSize.x / uSize.y;

  vec2 p = vec2(uv.x * aspect, uv.y);

  if (uMouse.z > 0.001) {
    vec2 dm = p - vec2(uMouse.x * aspect, uMouse.y);
    p += dm * exp(-dot(dm, dm) * 10.0) * 0.22 * uMouse.z;
  }

  float v = uBias
    + 0.20 * sin(dot(p, normalize(vec2(0.55, 1.0))) * 5.2 - uTime * 0.11)
    + 0.12 * sin(dot(p, normalize(vec2(1.0, 0.28))) * 8.4 + uTime * 0.07);

  if (uCalm.z > 0.0) {
    vec2 d = vec2((uv.x - uCalm.x) / uCalm.z, (uv.y - uCalm.y) / uCalm.w);
    v += 2.0 * (1.0 - smoothstep(0.75, 1.0, length(d)));
  }

  float threshold = bayer8(cellCoord);
  vec3 ink = v > threshold ? uInkA : uInkB;
  gl_FragColor = vec4(ink, 1.0);
}
`;

export const DitherField: React.FC<DitherFieldProps> = ({
  className = '',
  fill = false,
  bare = false,
  cell = 2.5,
  bias = 0.74,
  calm,
  interactive = false,
  children,
}) => {
  const hostRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = hostRef.current;
    if (!canvas || !host) return;

    const gl = canvas.getContext('webgl', { antialias: false, alpha: false, preserveDrawingBuffer: false });
    if (!gl) return;

    function createShader(type: number, source: string) {
      if (!gl) return null;
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    }

    const vs = createShader(gl.VERTEX_SHADER, VERTEX_SHADER);
    const fs = createShader(gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    gl.useProgram(program);

    // Single full-screen triangle covering the viewport
    const posBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW
    );

    const aPos = gl.getAttribLocation(program, 'aPos');
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uSize = gl.getUniformLocation(program, 'uSize');
    const uCell = gl.getUniformLocation(program, 'uCell');
    const uTime = gl.getUniformLocation(program, 'uTime');
    const uInkA = gl.getUniformLocation(program, 'uInkA');
    const uInkB = gl.getUniformLocation(program, 'uInkB');
    const uCalm = gl.getUniformLocation(program, 'uCalm');
    const uMouse = gl.getUniformLocation(program, 'uMouse');
    const uBias = gl.getUniformLocation(program, 'uBias');

    // Accent: #0A0B0E -> [10/255, 11/255, 14/255]
    gl.uniform3f(uInkA, 0.0392, 0.0431, 0.0549);
    // Paper: #EEF0F3 -> [238/255, 240/255, 243/255]
    gl.uniform3f(uInkB, 0.93333, 0.94117, 0.95294);
    gl.uniform1f(uBias, bias);

    if (calm) {
      gl.uniform4f(uCalm, calm[0], calm[1], calm[2], calm[3]);
    } else {
      gl.uniform4f(uCalm, 0.5, 0.5, 0.0, 0.0);
    }

    let mouseX = 0.5;
    let mouseY = 0.5;
    let targetMouseStrength = 0.0;
    let currentMouseStrength = 0.0;
    let targetX = 0.5;
    let targetY = 0.5;

    const handlePointerMove = (e: PointerEvent) => {
      const rect = host.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      targetX = (e.clientX - rect.left) / rect.width;
      targetY = 1.0 - (e.clientY - rect.top) / rect.height; // WebGL Y is inverted
      targetMouseStrength = 1.0;
    };

    const handlePointerLeave = () => {
      targetMouseStrength = 0.0;
    };

    if (interactive === 'window') {
      window.addEventListener('pointermove', handlePointerMove, { passive: true });
    } else if (interactive) {
      host.addEventListener('pointermove', handlePointerMove, { passive: true });
      host.addEventListener('pointerleave', handlePointerLeave, { passive: true });
    }

    let animationFrameId: number;
    let startTime = performance.now();
    let isVisible = true;

    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    });
    observer.observe(host);

    const resize = () => {
      if (!canvas || !gl || !host) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = host.clientWidth;
      const height = host.clientHeight;
      if (width === 0 || height === 0) return;

      const dw = Math.floor(width * dpr);
      const dh = Math.floor(height * dpr);
      if (canvas.width !== dw || canvas.height !== dh) {
        canvas.width = dw;
        canvas.height = dh;
        gl.viewport(0, 0, dw, dh);
        gl.uniform2f(uSize, dw, dh);
        gl.uniform1f(uCell, cell * dpr);
      }
    };

    const resizeObserver = new ResizeObserver(() => resize());
    resizeObserver.observe(host);
    resize();

    // Fade canvas in once compiled
    canvas.style.opacity = '1';
    canvas.style.transition = 'opacity 0.6s ease';

    const render = () => {
      if (!gl || gl.isContextLost()) return;

      if (isVisible) {
        const now = performance.now();
        const elapsed = (now - startTime) / 1000;

        // Smooth mouse interpolate
        mouseX += (targetX - mouseX) * 0.1;
        mouseY += (targetY - mouseY) * 0.1;
        currentMouseStrength += (targetMouseStrength - currentMouseStrength) * 0.08;

        gl.uniform1f(uTime, elapsed);
        gl.uniform3f(uMouse, mouseX, mouseY, currentMouseStrength);

        gl.drawArrays(gl.TRIANGLES, 0, 3);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      resizeObserver.disconnect();
      if (interactive === 'window') {
        window.removeEventListener('pointermove', handlePointerMove);
      } else if (interactive) {
        host.removeEventListener('pointermove', handlePointerMove);
        host.removeEventListener('pointerleave', handlePointerLeave);
      }
      if (gl) {
        const loseCtx = gl.getExtension('WEBGL_lose_context');
        loseCtx?.loseContext();
      }
    };
  }, [cell, bias, calm, interactive]);

  return (
    <div
      ref={hostRef}
      className={`dither-field ${fill ? 'is-fill' : ''} ${bare ? 'is-bare' : ''} ${className}`}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="dither-canvas" />
      {children}
    </div>
  );
};
