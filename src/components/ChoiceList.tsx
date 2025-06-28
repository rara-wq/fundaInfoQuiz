import useQuizStore from '../store/quizStore';
import type { Choice } from '../types/quiz';

interface Props {
  choices: readonly Choice[];
  correctChoiceIndex: number;
  isAnswerShown: boolean;
}

function ChoiceList({ choices, isAnswerShown, correctChoiceIndex }: Props) {
  const checkAnswer = useQuizStore((state) => state.checkAnswer);

  const handleChoiceClick = (index: number) => {
    if (!isAnswerShown) {
      checkAnswer(index);
      // Immediately show the answer after selection
      useQuizStore.getState().setShowAnswer(true);
    }
  };

  return (
    <>
      {choices.map((choice, index) => {
        const isCorrect = index === correctChoiceIndex;
        return (
          <div
            key={index}
            className={`choice ${isAnswerShown ? (isCorrect ? 'correct' : 'incorrect') : ''}`}
            onClick={() => handleChoiceClick(index)}
            data-index={index}
          >
            <div className="choice-text">
              <svg className="choice-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <circle cx="12" cy="12" r="10" stroke="white" />
                <path d="M9 12l2 2 4-4" stroke="white" />
              </svg>
              {choice.text}
            </div>
          </div>
        );
      })}
    </>
  );
}

export default ChoiceList; 