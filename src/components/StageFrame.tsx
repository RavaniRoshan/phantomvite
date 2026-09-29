import React from 'react';

interface StageFrameProps {
  className?: string;
  children: React.ReactNode;
  showNodes?: boolean;
}

export const StageFrame: React.FC<StageFrameProps> = ({
  className = '',
  children,
  showNodes = true,
}) => {
  return (
    <div className={`stage-frame ${className}`}>
      {showNodes && (
        <>
          <span className="stage-line stage-line--top" aria-hidden="true" />
          <span className="stage-line stage-line--bottom" aria-hidden="true" />
          <span className="stage-node stage-node--tl" aria-hidden="true" />
          <span className="stage-node stage-node--tr" aria-hidden="true" />
          <span className="stage-node stage-node--bl" aria-hidden="true" />
          <span className="stage-node stage-node--br" aria-hidden="true" />
        </>
      )}
      {children}
    </div>
  );
};
