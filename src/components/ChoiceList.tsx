import useQuizStore from '../store/quizStore';
import type { Choice } from '../types/quiz';

interface Props {
  choices: readonly Choice[];
  correctChoiceIndex: number;
  isAnswerShown: boolean;
}

const ChoiceList = ({
  choices,
  correctChoiceIndex,
  isAnswerShown,
}: Props) => {
  const checkAnswer = useQuizStore((state) => state.checkAnswer);
  const setShowAnswer = useQuizStore((state) => state.setShowAnswer);
  const choicePrefixes = ['A.', 'B.', 'C.', 'D.'];

  const handleChoiceClick = (selectedIndex: number) => {
    if (isAnswerShown) return;
    checkAnswer(selectedIndex);
    setShowAnswer(true);
  };

  const getButtonClass = (index: number) => {
    if (!isAnswerShown) {
      return 'bg-sky-200 hover:bg-sky-300 text-slate-800';
    }

    if (index === correctChoiceIndex) {
      return 'bg-emerald-500 text-white cursor-not-allowed';
    }
    return 'bg-slate-400 text-white cursor-not-allowed opacity-70';
  };

  return (
    <div className="space-y-4 rounded-lg border-4 border-green-800 bg-green-900/50 p-4">
      {choices.map((choice, index) => (
        <button
          key={index}
          disabled={isAnswerShown}
          onClick={() => handleChoiceClick(index)}
          className={`w-full text-left font-bold py-8 text-4xl rounded-xl shadow-md transition-colors duration-200 ${getButtonClass(
            index
          )}`}
        >
          <span className="mr-4 px-4">{choicePrefixes[index]}</span>
          {choice.text}
        </button>
      ))}
    </div>
  );
};

export default ChoiceList; 