import { useEffect } from 'react'
import useQuizStore from './store/quizStore'
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
  const isQuizFinished = useQuizStore((state) => state.isQuizFinished)

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
  const progress = questions.length > 0 ? ((currentQuestionIndex + 1) / questions.length) * 100 : 0

  return (
    <div className="container">
      <div className="quiz-card" id="quizCard">
        {questions.length === 0 ? (
          <div style={{ textAlign: 'center', color: '#667eea' }}>
            <p className="text-xl animate-pulse">問題を読み込んでいます...</p>
          </div>
        ) : !isQuizFinished && currentQuestion ? (
          <>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${progress}%` }}></div>
            </div>
            <div className="question-number">
              問題 {currentQuestionIndex + 1} / {questions.length}
            </div>
            <div className="question">{currentQuestion.body}</div>

            {!isAnswerShown && (
              <div className="choices" id="choicesContainer">
                <ChoiceList
                  choices={currentQuestion.choices}
                  correctChoiceIndex={currentQuestion.correctChoiceIndex}
                  isAnswerShown={isAnswerShown}
                />
              </div>
            )}

            <ExplanationPanel
              choices={currentQuestion.choices}
              correctChoiceIndex={currentQuestion.correctChoiceIndex}
              isAnswerShown={isAnswerShown}
            />
            <div className="navigation-hint">
              <span className="key-icon">→</span>
              <span id="navigationText">
                {isAnswerShown ? 'キーを押して次の問題へ' : 'キーを押して解答を表示'}
              </span>
            </div>
          </>
        ) : (
          <ResultScreen score={score} totalQuestions={questions.length} onReset={reset} />
        )}
      </div>
    </div>
  )
}

export default App
