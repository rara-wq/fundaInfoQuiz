import type { Choice } from '../types/quiz';

interface Props {
  correctChoiceIndex: number;
  choices: readonly Choice[];
}

const ExplanationPanel = ({ correctChoiceIndex, choices }: Props) => {
  return (
    <div className="animate-fade-in bg-slate-900/70 p-5 rounded-xl shadow-lg border border-slate-700">
      <h3 className="text-xl font-bold text-white text-center border-b border-slate-700 pb-2 mb-4">
        解説
      </h3>
      <ul className="space-y-4 text-left">
        {choices.map((choice, index) => {
          const isCorrect = index === correctChoiceIndex;
          return (
            <li
              key={index}
              className={
                isCorrect ? 'bg-emerald-500 p-3 rounded-lg' : ''
              }
            >
              <div
                className={`font-semibold ${
                  isCorrect ? 'text-white text-2xl' : 'text-white text-lg'
                }`}
              >
                {choice.text}
                {isCorrect && ' ✔'}
              </div>
              <p className="text-slate-300 leading-relaxed mt-1">
                {choice.explanation}
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ExplanationPanel; 