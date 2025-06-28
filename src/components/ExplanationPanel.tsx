import { forwardRef } from 'react';
import type { Choice } from '../types/quiz';

interface Props {
  choices: readonly Choice[];
  correctChoiceIndex: number;
  isAnswerShown: boolean;
}

const ExplanationPanel = forwardRef<HTMLDivElement, Props>(
  ({ choices, correctChoiceIndex, isAnswerShown }, ref) => {
    return (
      <div
        ref={ref}
        className={`explanation-section ${isAnswerShown ? 'show' : ''}`}
        id="explanationSection"
      >
        <div className="explanation-title">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#667eea" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 16v-4M12 8h.01" />
          </svg>
          解説
        </div>
        {choices.map((choice, index) => (
          <div
            key={index}
            className={`explanation-item ${
              index === correctChoiceIndex ? 'correct-explanation' : ''
            }`}
          >
            <div className="explanation-choice">{choice.text}</div>
            <div className="explanation-text">{choice.explanation}</div>
          </div>
        ))}
      </div>
    );
  }
);

export default ExplanationPanel; 