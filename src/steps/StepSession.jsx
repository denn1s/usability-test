import { useState, useEffect } from 'react'
import NavButtons from './NavButtons'

function Timer() {
  const [seconds, setSeconds] = useState(0)
  const [running, setRunning] = useState(false)

  useEffect(() => {
    if (!running) return
    const id = setInterval(() => setSeconds((s) => s + 1), 1000)
    return () => clearInterval(id)
  }, [running])

  const fmt = (s) => {
    const m = Math.floor(s / 60).toString().padStart(2, '0')
    const sec = (s % 60).toString().padStart(2, '0')
    return `${m}:${sec}`
  }

  return (
    <div className="flex items-center gap-3">
      <span className="font-mono text-2xl font-semibold text-slate-700 tabular-nums w-16">
        {fmt(seconds)}
      </span>
      <button
        onClick={() => setRunning((r) => !r)}
        className={`cursor-pointer text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors ${
          running
            ? 'bg-red-100 text-red-600 hover:bg-red-200'
            : 'bg-green-100 text-green-700 hover:bg-green-200'
        }`}
      >
        {running ? 'Pause' : seconds === 0 ? 'Start timer' : 'Resume'}
      </button>
      {seconds > 0 && !running && (
        <button
          onClick={() => { setSeconds(0); setRunning(false) }}
          className="cursor-pointer text-xs text-slate-400 hover:text-slate-600 transition-colors"
        >
          Reset
        </button>
      )}
    </div>
  )
}

const REMINDERS = [
  'Note exact words the user says, especially expressions of confusion or surprise.',
  'Mark where they hesitate or slow down — not just where they fail.',
  "Note if they try a path you didn't expect.",
  "Don't react to mistakes. Keep a neutral expression.",
  'Mark timing if something takes much longer than expected.',
]

export default function StepSession({ data, onUpdate, onNext, onBack }) {
  const [reminderIndex, setReminderIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setReminderIndex((i) => (i + 1) % REMINDERS.length)
    }, 20000)
    return () => clearInterval(id)
  }, [])

  return (
    <div>
      <div className="mb-6">
        <span className="inline-block bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-widest mb-3">
          Step 3 — Session active
        </span>
        <h1 className="text-3xl font-bold text-slate-800 mb-2">
          Observe and take notes
        </h1>
        <p className="text-slate-500 leading-relaxed">
          The test is running. Stay quiet and watch. Take notes on anything that stands out — words, hesitations, errors, surprises.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 mb-4 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1">Session timer</p>
          <Timer />
        </div>
        <div className="text-right">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1">Test goal</p>
          <p className="text-xs text-slate-500 max-w-xs leading-relaxed">{data.goal}</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 mb-4">
        <div className="flex items-start justify-between mb-3">
          <label className="text-sm font-semibold text-slate-600">Notes</label>
          <span className="text-xs text-slate-400">You can also write on paper and transfer later</span>
        </div>
        <textarea
          value={data.notes}
          onChange={(e) => onUpdate('notes', e.target.value)}
          placeholder={`Write anything you notice:\n• "User looked for a search bar on the top right but found the filter instead"\n• "Hesitated 15s before clicking Browse"\n• "Said 'oh that's weird' when the page scrolled automatically"`}
          rows={10}
          className="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-300 resize-y placeholder-slate-300 transition font-mono leading-relaxed"
        />
      </div>

      <div className="bg-indigo-50 border border-indigo-200 rounded-xl px-5 py-3.5 mb-8 flex items-start gap-3">
        <span className="text-indigo-400 mt-0.5">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </span>
        <p className="text-sm text-indigo-700 leading-relaxed">
          <strong>Reminder:</strong> {REMINDERS[reminderIndex]}
        </p>
      </div>

      <NavButtons
        onBack={onBack}
        onNext={onNext}
        nextLabel="Test is done — continue →"
      />
    </div>
  )
}
