interface Props {
  score: number;
  totalQuestions: number;
  onReset: () => void;
}

const ResultScreen = ({ score, totalQuestions, onReset }: Props) => {
  const accuracy = totalQuestions > 0 ? (score / totalQuestions) * 100 : 0;

  return (
    <div className="animate-fade-in text-white text-center">
      <h1 className="text-3xl font-bold mb-4">クイズ終了！</h1>
      <div className="bg-slate-700/50 p-6 rounded-xl shadow-lg mb-4">
        <p className="text-lg mb-2 text-slate-300">
          あなたのスコア
        </p>
        <p className="text-4xl font-bold mb-4">
          {score} / {totalQuestions}
        </p>
        <p className="text-lg mb-2 text-slate-300">
          正解率
        </p>
        <p className="text-4xl font-bold text-yellow-400">
          {accuracy.toFixed(1)}%
        </p>
      </div>
      <button
        onClick={onReset}
        className="w-full text-white text-center font-bold p-4 rounded-full shadow-lg border-2 transition-colors duration-200 bg-[#e54343] hover:bg-[#d43232] border-slate-900"
      >
        もう一度挑戦する
      </button>
    </div>
  );
};

export default ResultScreen; 