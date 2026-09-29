import React from 'react';
import { StageFrame } from './StageFrame';
import { DitherField } from './DitherField';
import { CTAButton } from './CTAButton';

interface CloseSectionProps {
  onOpenQuickstart: () => void;
}

export const CloseSection: React.FC<CloseSectionProps> = ({ onOpenQuickstart }) => {
  return (
    <section className="close" aria-label="Get started with Phantom">
      <StageFrame>
        <DitherField className="stage-mat" cell={2.5} bias={0.66} interactive="window">
          <div className="stage-content">
            <div className="close-plate">
              <h2 className="close-title">Computer use without the hostage situation.</h2>
              <CTAButton
                variant="inverted"
                onClick={onOpenQuickstart}
              >
                Launch Quickstart
              </CTAButton>
            </div>
          </div>
        </DitherField>
      </StageFrame>
    </section>
  );
};
