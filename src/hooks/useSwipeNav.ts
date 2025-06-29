import { useEffect, useRef } from 'react';
import useQuizStore from '../store/quizStore';

const SWIPE_THRESHOLD = 50; // 50px以上スワイプされたら検知

export function useSwipeNav() {
  const {
    goToNextQuestion,
    goToPrevQuestion,
    setShowAnswer,
    isAnswerShown,
    isQuizFinished,
    isQuizStarted,
  } = useQuizStore();

  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const touchEndX = useRef(0);
  const touchEndY = useRef(0);

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      touchStartX.current = e.changedTouches[0].screenX;
      touchStartY.current = e.changedTouches[0].screenY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      touchEndX.current = e.changedTouches[0].screenX;
      touchEndY.current = e.changedTouches[0].screenY;
      handleSwipe();
    };

    const handleSwipe = () => {
      if (!isQuizStarted || isQuizFinished) return;

      const deltaX = touchEndX.current - touchStartX.current;
      const deltaY = touchEndY.current - touchStartY.current;

      // 縦方向のスワイプは無視
      if (Math.abs(deltaY) > Math.abs(deltaX)) {
        return;
      }
      
      // 左スワイプ
      if (deltaX < -SWIPE_THRESHOLD) {
        if (!isAnswerShown) {
          setShowAnswer(true);
        } else {
          goToNextQuestion();
        }
      }
      
      // 右スワイプ
      if (deltaX > SWIPE_THRESHOLD) {
        goToPrevQuestion();
      }
    };
    
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [goToNextQuestion, goToPrevQuestion, setShowAnswer, isAnswerShown, isQuizStarted, isQuizFinished]);
} 