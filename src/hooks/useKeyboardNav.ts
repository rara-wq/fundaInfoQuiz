import { useEffect } from 'react';
import useQuizStore from '../store/quizStore';

export const useKeyboardNav = () => {
  const {
    isAnswerShown,
    setShowAnswer,
    goToNextQuestion,
    goToPrevQuestion,
    questions,
    currentQuestionIndex,
  } = useQuizStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // 問題がなければ何もしない
      if (questions.length === 0) return;
      
      // →キーの処理
      if (e.key === 'ArrowRight') {
        if (!isAnswerShown) {
          setShowAnswer(true);
        } else if (currentQuestionIndex < questions.length -1) {
          goToNextQuestion();
        }
      }

      // ←キーの処理
      if (e.key === 'ArrowLeft') {
        if (isAnswerShown) {
          setShowAnswer(false);
        } else {
          goToPrevQuestion();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // コンポーネントがアンマウントされた時にイベントリスナーを削除する
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isAnswerShown, setShowAnswer, goToNextQuestion, goToPrevQuestion, questions, currentQuestionIndex]);
}; 