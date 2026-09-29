import React, { useEffect, useRef } from 'react';

const NUM_PTS = 24;
const CELL_SIZE = 3;
const MAX_RADIUS = 0.045;
const SPREAD = 2;
const RADIUS_FALLOFF = 0.22;
const DENSITY_FALLOFF = 0.7;
const MAX_DENSITY = 0.75;
const OPACITY = 0.12;
const DECAY_IDLE = 0.06;
const NUM_SEGS = NUM_PTS - 1;
const MAX_DIST = (MAX_RADIUS * SPREAD) / NUM_SEGS;
const MIN_RADIUS = MAX_RADIUS * 0.02;

const VERTEX_SHADER = `
attribute vec2 aPos;
void main() {
  gl_Position = vec4(aPos, 0.0, 1.0);
}
`;

const FRAGMENT_SHADER = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif
uniform vec2 uCells;
uniform float uAspect;
uniform vec3 uInk;
uniform float uOpacity;
uniform vec4 uPts[${NUM_PTS}];

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
  vec2 cell = floor(gl_FragCoord.xy);
  vec2 uv = (cell + 0.5) / uCells;
  vec2 p = vec2(uv.x * uAspect, uv.y);

  float v = 0.0;
  for (int i = 0; i < ${NUM_SEGS}; i++) {
    vec4 a = uPts[i];
    vec4 b = uPts[i + 1];
    vec2 ba = b.xy - a.xy;
    float h = clamp(dot(p - a.xy, ba) / max(dot(ba, ba), 1e-6), 0.0, 1.0);
    float d = length(p - a.xy - ba * h);
    float r = mix(a.z, b.z, h);
    float dens = mix(a.w, b.w, h);
    v = max(v, dens * exp(-(d * d) / max(r * r, 1e-6)));
  }

  float on = step(bayer8(cell), v) * step(0.002, v);
  float alpha = on * uOpacity;
  gl_FragColor = vec4(uInk * alpha, alpha);
}
`;

export const DitherTrail: React.FC = () => {
  const hostRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    const canvas = canvasRef.current;
    if (!host || !canvas) return;

    // Check media queries
    if (
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      !window.matchMedia('(hover: hover) and (pointer: fine)').matches
    ) {
      return;
    }

    const gl = canvas.getContext('webgl', { antialias: false, alpha: true });
    if (!gl) return;

    function createShader(type: number, src: string) {
      if (!gl) return null;
      const s = gl.createShader(type);
      if (!s) return null;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        gl.deleteShader(s);
        return null;
      }
      return s;
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

    // Full screen triangle
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW
    );

    const aPos = gl.getAttribLocation(program, 'aPos');
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const locs = {
      cells: gl.getUniformLocation(program, 'uCells'),
      aspect: gl.getUniformLocation(program, 'uAspect'),
      ink: gl.getUniformLocation(program, 'uInk'),
      opacity: gl.getUniformLocation(program, 'uOpacity'),
      pts: gl.getUniformLocation(program, 'uPts'),
    };

    // Obsidian black accent: #0A0B0E -> [10/255, 11/255, 14/255]
    gl.uniform3f(locs.ink, 0.0392, 0.0431, 0.0549);
    gl.uniform1f(locs.opacity, OPACITY);

    const pts = Array.from({ length: NUM_PTS }, () => ({ x: 0.5, y: 0.5 }));
    const ptsData = new Float32Array(NUM_PTS * 4);
    const target = { x: 0.5, y: 0.5 };
    let aspect = 1;
    let hasMoved = false;
    let isBlank = false;
    let trailPower = 0;
    let lastTime = performance.now() / 1000;
    let lastMoveTime = -1;

    const getRadius = (t: number) =>
      Math.max(MAX_RADIUS * (1 - RADIUS_FALLOFF * t), MIN_RADIUS);
    const getDensity = (t: number) =>
      MAX_DENSITY * (1 - DENSITY_FALLOFF * t);

    const updatePhysics = (dt: number) => {
      const lerpFactor = 1 - Math.pow(0.7, dt * 60);

      // Lead bead follows target
      pts[0].x += (target.x - pts[0].x) * lerpFactor;
      pts[0].y += (target.y - pts[0].y) * lerpFactor;

      // Trailing beads follow previous
      for (let i = 1; i < NUM_PTS; i++) {
        const prev = pts[i - 1];
        const cur = pts[i];
        cur.x += (prev.x - cur.x) * lerpFactor;
        cur.y += (prev.y - cur.y) * lerpFactor;

        const dx = cur.x - prev.x;
        const dy = cur.y - prev.y;
        const dist = Math.hypot(dx, dy);
        if (dist > MAX_DIST) {
          cur.x = prev.x + (dx / dist) * MAX_DIST;
          cur.y = prev.y + (dy / dist) * MAX_DIST;
        }
      }
    };

    const draw = () => {
      for (let i = 0; i < NUM_PTS; i++) {
        const t = i / NUM_SEGS;
        const pt = pts[i];
        ptsData[i * 4] = pt.x;
        ptsData[i * 4 + 1] = pt.y;
        ptsData[i * 4 + 2] = getRadius(t);
        ptsData[i * 4 + 3] = getDensity(t) * trailPower;
      }
      gl.uniform4fv(locs.pts, ptsData);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    const resize = () => {
      const w = Math.max(window.innerWidth, 1);
      const h = Math.max(window.innerHeight, 1);
      const cols = Math.ceil(w / CELL_SIZE);
      const rows = Math.ceil(h / CELL_SIZE);

      if (canvas.width !== cols || canvas.height !== rows) {
        canvas.width = cols;
        canvas.height = rows;
        gl.viewport(0, 0, cols, rows);
        gl.uniform2f(locs.cells, cols, rows);
        canvas.style.width = `${cols * CELL_SIZE}px`;
        canvas.style.height = `${rows * CELL_SIZE}px`;
      }
      aspect = w / h;
      gl.uniform1f(locs.aspect, aspect);
    };

    window.addEventListener('resize', resize);
    resize();

    let animId: number;

    const tick = () => {
      const now = performance.now() / 1000;
      const dt = Math.min(Math.max(now - lastTime, 0.001), 0.05);
      lastTime = now;

      if (hasMoved) {
        const isRecent = now - lastMoveTime < DECAY_IDLE ? 1 : 0;
        trailPower += (isRecent - trailPower) * (1 - Math.pow(0.88, dt * 60));

        if (trailPower < 0.002) {
          if (!isBlank) {
            isBlank = true;
            trailPower = 0;
            draw();
          }
        } else {
          isBlank = false;
          updatePhysics(dt);
          draw();
        }
      }

      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);

    const onPointerMove = (e: MouseEvent) => {
      const w = Math.max(window.innerWidth, 1);
      const h = Math.max(window.innerHeight, 1);
      target.x = (e.clientX / w) * aspect;
      target.y = 1 - e.clientY / h;
      lastMoveTime = performance.now() / 1000;

      if (!hasMoved) {
        hasMoved = true;
        for (const pt of pts) {
          pt.x = target.x;
          pt.y = target.y;
        }
        lastTime = performance.now() / 1000;
      }
    };

    window.addEventListener('mousemove', onPointerMove, { passive: true });

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onPointerMove);
      const loseCtx = gl.getExtension('WEBGL_lose_context');
      loseCtx?.loseContext();
    };
  }, []);

  return (
    <div ref={hostRef} className="dither-trail" aria-hidden="true">
      <canvas ref={canvasRef} className="dither-trail-canvas" />
    </div>
  );
};
