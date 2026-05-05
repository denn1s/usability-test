import NavButtons from './NavButtons'

const SUS_QUESTIONS = [
  'I think that I would like to use this system frequently.',
  'I found the system unnecessarily complex.',
  'I thought the system was easy to use.',
  'I think that I would need the support of a technical person to be able to use this system.',
  'I found the various functions in this system were well integrated.',
  'I thought there was too much inconsistency in this system.',
  'I would imagine that most people would learn to use this system very quickly.',
  'I found the system very cumbersome to use.',
  'I felt very confident using the system.',
  'I needed to learn a lot of things before I could get going with this system.',
]

const LABELS = ['Strongly\nDisagree', 'Disagree', 'Neutral', 'Agree', 'Strongly\nAgree']

export default function StepSUS({ data, onUpdate, onNext, onBack }) {
  const answers = data.susAnswers
  const answered = answers.filter((a) => a !== null).length
  const allAnswered = answered === 10

  const setAnswer = (index, value) => {
    const next = [...answers]
    next[index] = value
    onUpdate('susAnswers', next)
  }

  return (
    <div>
      <div className="mb-8">
        <div className="bg-violet-100 border border-violet-200 rounded-xl px-5 py-4 mb-6 text-center">
          <p className="text-sm font-semibold text-violet-800 mb-1">
            This survey is for the test user to fill out
          </p>
          <p className="text-sm text-violet-600">
            Rate each statement based on your personal experience with the design you just used.
          </p>
        </div>

        <h1 className="text-2xl font-bold text-slate-800 mb-1">
          System Usability Scale
        </h1>
        <p className="text-slate-500 text-sm leading-relaxed">
          For each statement, choose the number that best matches your experience — from 1 (Strongly Disagree) to 5 (Strongly Agree). Answer based on your gut feeling; there are no right answers.
        </p>
      </div>

      <div className="space-y-4 mb-8">
        {SUS_QUESTIONS.map((question, i) => (
          <div key={i} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
            <div className="flex gap-3 mb-4">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-slate-100 text-slate-500 text-xs font-bold shrink-0 mt-0.5">
                {i + 1}
              </span>
              <p className="text-sm text-slate-700 font-medium leading-relaxed">{question}</p>
            </div>

            <div className="flex gap-2 justify-between">
              {[1, 2, 3, 4, 5].map((val) => (
                <label key={val} className="flex-1 flex flex-col items-center gap-1 cursor-pointer group">
                  <input
                    type="radio"
                    name={`q${i}`}
                    value={val}
                    checked={answers[i] === val}
                    onChange={() => setAnswer(i, val)}
                    className="sr-only"
                  />
                  <div
                    className={`w-full h-10 rounded-lg border-2 flex items-center justify-center font-semibold text-sm transition-all ${
                      answers[i] === val
                        ? 'border-indigo-500 bg-indigo-500 text-white'
                        : 'border-slate-200 text-slate-400 hover:border-indigo-300 hover:text-indigo-500'
                    }`}
                  >
                    {val}
                  </div>
                  <span className="text-[10px] text-slate-400 text-center leading-tight whitespace-pre-line hidden sm:block">
                    {val === 1 ? 'Strongly\nDisagree' : val === 5 ? 'Strongly\nAgree' : ''}
                  </span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="h-2 bg-slate-100 rounded-full overflow-hidden w-32">
            <div
              className="h-full bg-indigo-500 rounded-full transition-all duration-500"
              style={{ width: `${(answered / 10) * 100}%` }}
            />
          </div>
          <span className="text-xs text-slate-400">{answered}/10 answered</span>
        </div>
      </div>

      <NavButtons
        onBack={onBack}
        onNext={onNext}
        nextDisabled={!allAnswered}
        nextLabel="See results →"
        nextHint={!allAnswered ? `${10 - answered} question${10 - answered !== 1 ? 's' : ''} remaining` : null}
      />
    </div>
  )
}
