import { create } from 'zustand';
import type { Question, Chapter } from '../types/quiz';

export interface QuizState {
  chapters: Chapter[];
  questions: Question[];
  glossary: Record<string, string>;
  currentQuestionIndex: number;
  score: number;
  isQuizFinished: boolean;
  isAnswerShown: boolean;
  isQuizStarted: boolean;
  loadChapters: (chapters: Chapter[]) => void;
  loadGlossary: (glossary: Record<string, string>) => void;
  selectChapter: (chapterId: string) => void;
  goToNextQuestion: () => void;
  goToPrevQuestion: () => void;
  checkAnswer: (selectedChoiceIndex: number) => void;
  setShowAnswer: (isShown: boolean) => void;
  reset: () => void;
  backToChapterSelection: () => void;
}

const useQuizStore = create<QuizState>()((set, get) => ({
  chapters: [],
  questions: [],
  glossary: {},
  currentQuestionIndex: 0,
  isAnswerShown: false,
  score: 0,
  isQuizFinished: false,
  isQuizStarted: false,

  loadChapters: (chapters: Chapter[]) => {
    set({
      chapters,
      questions: [],
      currentQuestionIndex: 0,
      score: 0,
      isQuizFinished: false,
      isQuizStarted: false,
      isAnswerShown: false,
    });
  },

  loadGlossary: (glossary: Record<string, string>) => {
    set({ glossary });
  },

  selectChapter: (chapterId: string) => {
    const chapter = get().chapters.find((c) => c.id === chapterId);
    if (chapter) {
      set({
        questions: chapter.questions,
        isQuizStarted: true,
        currentQuestionIndex: 0,
        score: 0,
        isQuizFinished: false,
        isAnswerShown: false,
      });
    }
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
    const currentChapterQuestions = get().questions;
    set({
      questions: currentChapterQuestions,
      currentQuestionIndex: 0,
      score: 0,
      isQuizFinished: false,
      isAnswerShown: false,
      isQuizStarted: true,
    });
  },

  backToChapterSelection: () => {
    set({
      questions: [],
      currentQuestionIndex: 0,
      score: 0,
      isQuizFinished: false,
      isAnswerShown: false,
      isQuizStarted: false,
    });
  },
}));

export default useQuizStore; 