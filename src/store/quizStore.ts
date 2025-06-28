import { create } from 'zustand';
import type { Question } from '../types/quiz';

export interface QuizState {
  questions: Question[];
  currentQuestionIndex: number;
  score: number;
  isQuizFinished: boolean;
  isAnswerShown: boolean;
  loadQuestions: (questions: Question[]) => void;
  goToNextQuestion: () => void;
  goToPrevQuestion: () => void;
  checkAnswer: (selectedChoiceIndex: number) => void;
  setShowAnswer: (isShown: boolean) => void;
  reset: () => void;
}

const useQuizStore = create<QuizState>()((set, get) => ({
  questions: [],
  currentQuestionIndex: 0,
  isAnswerShown: false,
  score: 0,
  isQuizFinished: false,

  loadQuestions: (questions: Question[]) => {
    set({
      questions,
      currentQuestionIndex: 0,
      score: 0,
      isQuizFinished: false,
      isAnswerShown: false,
    });
  },

  goToNextQuestion: () => {
    set((state) => {
      if (state.currentQuestionIndex < state.questions.length - 1) {
        return {
          currentQuestionIndex: state.currentQuestionIndex + 1,
          isAnswerShown: false,
        };
      }
      return { isQuizFinished: true };
    });
  },

  goToPrevQuestion: () => {
    set((state) => ({
      currentQuestionIndex: Math.max(0, state.currentQuestionIndex - 1),
      isAnswerShown: false,
    }));
  },

  checkAnswer: (selectedChoiceIndex: number) => {
    const currentQuestion = get().questions[get().currentQuestionIndex];
    if (currentQuestion.correctChoiceIndex === selectedChoiceIndex) {
      set((state) => ({ score: state.score + 1 }));
    }
  },

  setShowAnswer: (isShown) => {
    set({ isAnswerShown: isShown });
  },

  reset: () => {
    set({
      currentQuestionIndex: 0,
      score: 0,
      isQuizFinished: false,
      isAnswerShown: false,
    });
  },
}));

export default useQuizStore; 