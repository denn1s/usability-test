import { useMemo, useState } from 'react'

function computeSUS(answers) {
  let total = 0
  answers.forEach((val, i) => {
    if (val === null) return
    // Odd index (0-based even questions) = positive: val - 1
    // Even index (0-based odd questions) = negative: 5 - val
    total += i % 2 === 0 ? val - 1 : 5 - val
  })
  return total * 2.5
}

const GRADES = [
  { min: 90, grade: 'A', label: 'Excellent', color: 'emerald', desc: 'Users find this design highly usable. Very few friction points.' },
  { min: 80, grade: 'B', label: 'Good', color: 'green', desc: 'Solid usability. Minor issues may exist but the overall experience works well.' },
  { min: 68, grade: 'C', label: 'OK', color: 'yellow', desc: 'Average usability. Around the industry mean — there is room for improvement.' },
  { min: 51, grade: 'D', label: 'Poor', color: 'orange', desc: 'Below average. Users likely struggle with key parts of the interface.' },
  { min: 0,  grade: 'F', label: 'Awful', color: 'red', desc: 'Serious usability problems. The design likely needs fundamental rethinking.' },
]

const COLOR_MAP = {
  emerald: { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700', badge: 'bg-emerald-100 text-emerald-700', bar: 'bg-emerald-500', ring: 'ring-emerald-300' },
  green:   { bg: 'bg-green-50',   border: 'border-green-200',   text: 'text-green-700',   badge: 'bg-green-100 text-green-700',   bar: 'bg-green-500',   ring: 'ring-green-300' },
  yellow:  { bg: 'bg-yellow-50',  border: 'border-yellow-200',  text: 'text-yellow-700',  badge: 'bg-yellow-100 text-yellow-700', bar: 'bg-yellow-400',  ring: 'ring-yellow-300' },
  orange:  { bg: 'bg-orange-50',  border: 'border-orange-200',  text: 'text-orange-700',  badge: 'bg-orange-100 text-orange-700', bar: 'bg-orange-400',  ring: 'ring-orange-300' },
  red:     { bg: 'bg-red-50',     border: 'border-red-200',     text: 'text-red-700',     badge: 'bg-red-100 text-red-700',       bar: 'bg-red-500',     ring: 'ring-red-300' },
}

const REFLECTION_QUESTIONS = [
  { q: 'Did the user complete the goal?', hint: 'Fully, partially, or not at all? Was there a point where they gave up or got redirected?' },
  { q: 'Where did they hesitate or slow down?', hint: 'These moments often point to unclear labels, unexpected layouts, or missing feedback.' },
  { q: 'Did anything take longer than you expected?', hint: 'Compare your mental model of the task to how long it actually took them.' },
  { q: 'Did they say anything surprising out loud?', hint: 'Look at your notes — any phrases that reveal assumptions or misunderstandings about the design?' },
  { q: 'Does the SUS score match what you observed?', hint: 'If the score is higher than expected, why? If lower — what did the number pick up that you might have missed, or vice versa?' },
  { q: 'What is the single most important thing to fix?', hint: 'If you could only change one thing before the next test, what would it be and why?' },
]

function ScoreGauge({ score }) {
  const grade = GRADES.find((g) => score >= g.min) || GRADES[GRADES.length - 1]
  const c = COLOR_MAP[grade.color]
  const pct = Math.min(100, Math.max(0, score))

  return (
    <div className={`${c.bg} border ${c.border} rounded-2xl p-6`}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1">SUS Score</p>
          <div className="flex items-baseline gap-2">
            <span className={`text-6xl font-bold ${c.text}`}>{Math.round(score)}</span>
            <span className="text-slate-400 text-lg font-medium">/ 100</span>
          </div>
        </div>
        <div className="text-right">
          <span className={`inline-block ${c.badge} text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-1`}>
            Grade {grade.grade}
          </span>
          <p className={`text-2xl font-bold ${c.text}`}>{grade.label}</p>
        </div>
      </div>

      <div className="relative mb-4">
        <div className="h-3 bg-white/60 rounded-full overflow-hidden">
          <div
            className={`h-full ${c.bar} rounded-full transition-all duration-1000`}
            style={{ width: `${pct}%` }}
          />
        </div>
        <div className="flex justify-between mt-1">
          <span className="text-xs text-slate-400">0 — Awful</span>
          <span className="text-xs text-slate-500 font-medium">68 = industry average</span>
          <span className="text-xs text-slate-400">100 — Excellent</span>
        </div>
      </div>

      <p className={`text-sm ${c.text} leading-relaxed`}>{grade.desc}</p>
    </div>
  )
}

function ScaleTable({ score }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b border-slate-100">
        <p className="text-sm font-semibold text-slate-600">How the SUS scale works</p>
      </div>
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-slate-50 text-xs text-slate-400 uppercase tracking-widest">
            <th className="text-left px-5 py-3 font-semibold">Score</th>
            <th className="text-left px-5 py-3 font-semibold">Grade</th>
            <th className="text-left px-5 py-3 font-semibold">Adjective</th>
          </tr>
        </thead>
        <tbody>
          {[
            { range: '90 – 100', grade: 'A', label: 'Excellent', min: 90 },
            { range: '80 – 89',  grade: 'B', label: 'Good',      min: 80 },
            { range: '68 – 79',  grade: 'C', label: 'OK',        min: 68 },
            { range: '51 – 67',  grade: 'D', label: 'Poor',      min: 51 },
            { range: '0 – 50',   grade: 'F', label: 'Awful',     min: 0  },
          ].map(({ range, grade, label, min }, i) => {
            const isThis = score >= min && (i === 0 || score < [Infinity, 90, 80, 68, 51][i])
            return (
              <tr
                key={grade}
                className={`border-t border-slate-100 ${isThis ? 'bg-indigo-50' : ''}`}
              >
                <td className="px-5 py-3 font-mono text-slate-600">{range}</td>
                <td className="px-5 py-3 font-bold text-slate-700">{grade}</td>
                <td className="px-5 py-3">
                  <span className="text-slate-600">{label}</span>
                  {isThis && (
                    <span className="ml-2 text-xs bg-indigo-100 text-indigo-600 px-2 py-0.5 rounded-full font-semibold">
                      Your score
                    </span>
                  )}
                  {grade === 'C' && range.includes('68') && (
                    <span className="ml-1 text-xs text-slate-400">(68 = avg)</span>
                  )}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default function StepResults({ data }) {
  const score = useMemo(() => computeSUS(data.susAnswers), [data.susAnswers])
  const [openIndex, setOpenIndex] = useState(null)

  return (
    <div>
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-indigo-100 mb-4">
          <svg className="w-8 h-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
        <h1 className="text-4xl font-bold text-slate-800 mb-2">Your results</h1>
        <p className="text-slate-500 text-base leading-relaxed max-w-md mx-auto">
          Here's what your usability test produced. Use this page to reflect on what you learned.
        </p>
      </div>

      <div className="space-y-5 mb-6">
        <ScoreGauge score={score} />

        <div className="bg-amber-50 border border-amber-200 rounded-xl px-5 py-4 text-sm text-amber-800 flex gap-3">
          <span className="text-amber-500 mt-0.5 shrink-0">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </span>
          <div>
            <strong>Important: this is N=1 data.</strong> With a single test user, the SUS score is anecdotal — it describes one person's experience, not a population. In a real study, you'd need at least 5–8 users for the score to be reliable, and many more for statistical significance. Treat this number as a directional signal, not a verdict.
          </div>
        </div>

        <ScaleTable score={score} />

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <p className="text-sm font-semibold text-slate-400 uppercase tracking-widest mb-3">Your test goal</p>
          <p className="text-base text-slate-700 leading-relaxed">{data.goal || <span className="text-slate-300 italic">No goal recorded</span>}</p>
        </div>

        {data.notes && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <p className="text-sm font-semibold text-slate-400 uppercase tracking-widest mb-3">Your session notes</p>
            <pre className="text-sm text-slate-600 leading-relaxed whitespace-pre-wrap font-sans">{data.notes}</pre>
          </div>
        )}
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-8">
        <div className="px-6 py-5 border-b border-slate-100">
          <h2 className="text-lg font-bold text-slate-800 mb-1">Reflect on your session</h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            Don't just read the score — discuss these questions with your group. Your notes are the real data; the SUS is a complement.
          </p>
        </div>

        <div className="divide-y divide-slate-100">
          {REFLECTION_QUESTIONS.map(({ q, hint }, i) => (
            <div key={i}>
              <button
                className="cursor-pointer w-full text-left px-6 py-4 flex items-start gap-4 hover:bg-slate-50 transition-colors"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 text-xs font-bold shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <span className="text-sm font-semibold text-slate-700 flex-1 text-left">{q}</span>
                <svg
                  className={`w-4 h-4 text-slate-400 shrink-0 mt-0.5 transition-transform ${openIndex === i ? 'rotate-180' : ''}`}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openIndex === i && (
                <div className="px-6 pb-4 ml-10">
                  <p className="text-sm text-slate-500 leading-relaxed bg-slate-50 rounded-xl px-4 py-3">
                    {hint}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-indigo-600 rounded-2xl px-6 py-6 text-white text-center">
        <h2 className="text-lg font-bold mb-2">You just ran a usability test</h2>
        <p className="text-indigo-200 text-sm leading-relaxed max-w-md mx-auto">
          Even with one user and a prototype, you've collected real observational data and a standardized usability metric. In practice, you'd repeat this with more users, iterate on your design, and test again. That loop is the core of user-centered design.
        </p>
      </div>
    </div>
  )
}
