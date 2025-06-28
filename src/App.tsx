import { useEffect } from 'react'
import useQuizStore from './store/quizStore'
import QuestionCard from './components/QuestionCard'
import ChoiceList from './components/ChoiceList'
import ExplanationPanel from './components/ExplanationPanel'
import { useKeyboardNav } from './hooks/useKeyboardNav'
import ResultScreen from './components/ResultScreen'

function App() {
  // キーボードナビゲーションを有効にする
  useKeyboardNav()

  // ストアから必要な状態とアクションを個別に取得する
  const questions = useQuizStore((state) => state.questions)
  const currentQuestionIndex = useQuizStore((state) => state.currentQuestionIndex)
  const loadQuestions = useQuizStore((state) => state.loadQuestions)
  const isAnswerShown = useQuizStore((state) => state.isAnswerShown)
  const score = useQuizStore((state) => state.score)
  const reset = useQuizStore((state) => state.reset)

  // コンポーネントがマウントされた時に一度だけ問題データを読み込む
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch('/data/questions.json')
        if (!response.ok) {
          throw new Error('ネットワークの応答がありませんでした')
        }
        const data = await response.json()
        loadQuestions(data) // 取得したデータをストアに渡す
      } catch (error) {
        console.error('問題の読み込みに失敗しました:', error)
      }
    }

    fetchQuestions()
  }, []) // 依存配列を空にして、マウント時に一度だけ実行

  const currentQuestion = questions[currentQuestionIndex]

  return (
    <main className="min-h-screen bg-gray-200 flex justify-center items-center p-4 font-sans">
      <div className="w-full max-w-[400px] mx-auto bg-slate-800 rounded-xl shadow-2xl p-5 space-y-5">
        {questions.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-96">
            <p className="text-xl animate-pulse text-white">問題を読み込んでいます...</p>
          </div>
        ) : currentQuestion ? (
          <>
            <h1 className="text-lg font-bold text-slate-300 text-center">
              問題 {currentQuestionIndex + 1} / {questions.length}
            </h1>
            <QuestionCard questionBody={currentQuestion.body} />
            <ChoiceList
              choices={currentQuestion.choices}
              correctChoiceIndex={currentQuestion.correctChoiceIndex}
              isAnswerShown={isAnswerShown}
            />
            {isAnswerShown && (
              <ExplanationPanel
                choices={currentQuestion.choices}
                correctChoiceIndex={currentQuestion.correctChoiceIndex}
              />
            )}
          </>
        ) : (
          <ResultScreen
            score={score}
            totalQuestions={questions.length}
            onReset={reset}
          />
        )}
      </div>
    </main>
  )
}

export default App
