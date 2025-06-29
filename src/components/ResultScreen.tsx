interface Props {
  score: number;
  totalQuestions: number;
  onReset: () => void;
  onBackToChapterSelect: () => void;
}

function ResultScreen({ score, totalQuestions, onReset, onBackToChapterSelect }: Props) {
  const percentage = Math.round((score / totalQuestions) * 100);
  let emoji, message;

  if (percentage === 100) {
    emoji = '🎉';
    message = '完璧です！素晴らしい成績です！';
  } else if (percentage >= 80) {
    emoji = '😊';
    message = 'とても良い成績です！';
  } else if (percentage >= 60) {
    emoji = '🙂';
    message = 'よく頑張りました！';
  } else {
    emoji = '💪';
    message = 'もう一度チャレンジしてみましょう！';
  }

  return (
    <div className="result-screen">
      <div className="result-icon">{emoji}</div>
      <div className="result-title">クイズ終了！</div>
      <div className="result-score">
        {score} / {totalQuestions}
      </div>
      <div className="result-message">{message}</div>
      <button className="restart-button" onClick={onReset}>
        もう一度挑戦する
      </button>
      <button className="back-button" onClick={onBackToChapterSelect}>
        章選択に戻る
      </button>
    </div>
  );
}

export default ResultScreen; 