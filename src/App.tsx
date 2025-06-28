import { useEffect, useState, useRef } from 'react'
import useQuizStore from './store/quizStore'
import ChoiceList from './components/ChoiceList'
import ExplanationPanel from './components/ExplanationPanel'
import { useKeyboardNav } from './hooks/useKeyboardNav'
import ResultScreen from './components/ResultScreen'

function App() {
  // キーボードナビゲーションを有効にする
  useKeyboardNav()
  const [cardHeight, setCardHeight] = useState<number | 'auto'>('auto')
  const questionViewRef = useRef<HTMLDivElement>(null)
  const explanationViewRef = useRef<HTMLDivElement>(null)

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

  useEffect(() => {
    const timer = setTimeout(() => {
      const questionHeight = questionViewRef.current?.offsetHeight ?? 0
      const explanationHeight = explanationViewRef.current?.offsetHeight ?? 0
      if (questionHeight > 0 && explanationHeight > 0) {
        setCardHeight(Math.max(questionHeight, explanationHeight))
      }
    }, 50) // DOMの更新を待つための短い遅延

    return () => clearTimeout(timer)
  }, [currentQuestion])

  return (
    <div className="container">
      {/* Hidden calculators for height measurement */}
      <div style={{ visibility: 'hidden', position: 'absolute', zIndex: -1, width: '100%', maxWidth: '900px' }}>
        {currentQuestion && (
          <>
            {/* Question View Calculator */}
            <div className="quiz-card" ref={questionViewRef}>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${progress}%` }}></div>
              </div>
              <div className="question-number">
                問題 {currentQuestionIndex + 1} / {questions.length}
              </div>
              <div className="question">{currentQuestion.body}</div>
              <div className="choices">
                <ChoiceList
                  choices={currentQuestion.choices}
                  correctChoiceIndex={currentQuestion.correctChoiceIndex}
                  isAnswerShown={false}
                />
              </div>
              <div className="navigation-hint">
                <span className="key-icon">→</span>
                <span>キーを押して解答を表示</span>
              </div>
            </div>

            {/* Explanation View Calculator */}
            <div className="quiz-card" ref={explanationViewRef} style={{ marginTop: '20px' }}>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${progress}%` }}></div>
              </div>
              <div className="question-number">
                問題 {currentQuestionIndex + 1} / {questions.length}
              </div>
              <div className="question">{currentQuestion.body}</div>
              <ExplanationPanel
                choices={currentQuestion.choices}
                correctChoiceIndex={currentQuestion.correctChoiceIndex}
                isAnswerShown={true}
              />
              <div className="navigation-hint">
                <span className="key-icon">→</span>
                <span>キーを押して次の問題へ</span>
              </div>
            </div>
          </>
        )}
      </div>

      <div className="quiz-card" id="quizCard" style={{ minHeight: cardHeight }}>
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
