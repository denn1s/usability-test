import { useState } from 'react'
import StepWelcome from './steps/StepWelcome'
import StepGoal from './steps/StepGoal'
import StepPrepare from './steps/StepPrepare'
import StepSession from './steps/StepSession'
import StepHandoff from './steps/StepHandoff'
import StepSUS from './steps/StepSUS'
import StepResults from './steps/StepResults'

const STEPS = ['welcome', 'goal', 'prepare', 'session', 'handoff', 'sus', 'results']
const PROGRESS_STEPS = ['goal', 'prepare', 'session', 'sus', 'results']
const STEP_LABELS = { goal: 'Goal', prepare: 'Setup', session: 'Session', sus: 'SUS', results: 'Results' }

export default function App() {
  const [stepIndex, setStepIndex] = useState(0)
  const [data, setData] = useState({
    goal: '',
    notes: '',
    susAnswers: Array(10).fill(null),
  })

  const step = STEPS[stepIndex]
  const next = () => setStepIndex((i) => Math.min(i + 1, STEPS.length - 1))
  const back = () => setStepIndex((i) => Math.max(i - 1, 0))
  const update = (key, value) => setData((d) => ({ ...d, [key]: value }))

  const showHeader = step !== 'welcome' && step !== 'results' && step !== 'handoff'
  const progressIndex = PROGRESS_STEPS.indexOf(step)

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {showHeader && (
        <header className="bg-white border-b border-slate-200 px-6 py-4 sticky top-0 z-10">
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-slate-400 tracking-widest uppercase">
                Usability Test Wizard
              </span>
              <span className="text-xs text-slate-400">
                Step {progressIndex + 1} of {PROGRESS_STEPS.length}
              </span>
            </div>
            <div className="flex gap-2">
              {PROGRESS_STEPS.map((s, i) => {
                const isPast = i < progressIndex
                const isActive = i === progressIndex
                return (
                  <div key={s} className="flex-1 flex flex-col gap-1">
                    <div
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        isPast ? 'bg-indigo-500' : isActive ? 'bg-indigo-400' : 'bg-slate-200'
                      }`}
                    />
                    <span
                      className={`text-xs text-center font-medium transition-colors ${
                        isActive ? 'text-indigo-600' : isPast ? 'text-indigo-400' : 'text-slate-300'
                      }`}
                    >
                      {STEP_LABELS[s]}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        </header>
      )}

      <main className="flex-1 flex items-start justify-center px-4 py-10">
        <div className="w-full max-w-2xl">
          {step === 'welcome'  && <StepWelcome onNext={next} />}
          {step === 'goal'     && <StepGoal data={data} onUpdate={update} onNext={next} onBack={back} />}
          {step === 'prepare'  && <StepPrepare data={data} onNext={next} onBack={back} />}
          {step === 'session'  && <StepSession data={data} onUpdate={update} onNext={next} onBack={back} />}
          {step === 'handoff'  && <StepHandoff onNext={next} onBack={back} />}
          {step === 'sus'      && <StepSUS data={data} onUpdate={update} onNext={next} onBack={back} />}
          {step === 'results'  && <StepResults data={data} />}
        </div>
      </main>
    </div>
  )
}
