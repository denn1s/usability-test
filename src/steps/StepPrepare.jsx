import { useState } from 'react'
import NavButtons from './NavButtons'

const CHECKLIST = [
  { id: 'prototype', label: 'Prototype is open and on the right starting screen' },
  { id: 'quiet', label: 'You are in a relatively quiet space with no distractions' },
  { id: 'roles', label: 'You know who is facilitating and who is taking notes' },
  { id: 'paper', label: 'Paper (or a second device) is ready for notes if needed' },
]

export default function StepPrepare({ data, onNext, onBack }) {
  const [checked, setChecked] = useState({})

  const toggle = (id) => setChecked((c) => ({ ...c, [id]: !c[id] }))
  const allChecked = CHECKLIST.every((i) => checked[i.id])

  return (
    <div>
      <div className="mb-8">
        <span className="inline-block bg-indigo-100 text-indigo-700 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-widest mb-3">
          Step 2 — Setup
        </span>
        <h1 className="text-3xl font-bold text-slate-800 mb-2">
          Prepare the session
        </h1>
        <p className="text-slate-500 leading-relaxed">
          Before the test starts, get your environment and your user ready. A well-prepared session means fewer interruptions and better data.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 mb-5">
        <p className="text-sm font-semibold text-slate-600 mb-4">Setup checklist</p>
        <ul className="space-y-3">
          {CHECKLIST.map(({ id, label }) => (
            <li key={id}>
              <label className="flex gap-3 items-center cursor-pointer group">
                <input
                  type="checkbox"
                  checked={!!checked[id]}
                  onChange={() => toggle(id)}
                  className="w-5 h-5 rounded accent-indigo-600 cursor-pointer"
                />
                <span className={`text-sm transition-colors ${checked[id] ? 'text-slate-400 line-through' : 'text-slate-700'}`}>
                  {label}
                </span>
              </label>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 mb-5">
        <p className="text-sm font-semibold text-slate-600 mb-1">Brief your test user</p>
        <p className="text-xs text-slate-400 mb-4">Read this (or something like it) to your test user before you start:</p>
        <blockquote className="bg-indigo-50 border-l-4 border-indigo-300 px-5 py-4 rounded-r-xl text-sm text-slate-700 leading-relaxed italic">
          "Today we're going to ask you to use a prototype of a design we made. We want to see how you naturally interact with it, so <strong>please think out loud</strong> — narrate what you're doing, what you're looking for, and how you're feeling as you go. There are no right or wrong answers. We're testing the design, not you. If you get stuck, that's useful information for us. We'll be taking notes but we won't interfere."
        </blockquote>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 mb-5">
        <p className="text-sm font-semibold text-slate-600 mb-1">Read the task goal aloud</p>
        <p className="text-xs text-slate-400 mb-3">After briefing the user, read them your goal as a task. You can rephrase it to sound natural, but don't give hints on how to do it.</p>
        <div className="bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 text-sm text-slate-700 leading-relaxed">
          <span className="text-slate-400 text-xs block mb-1 font-medium">Your goal:</span>
          {data.goal || <span className="text-slate-300 italic">No goal written yet</span>}
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-xl px-5 py-4 text-sm text-amber-800 mb-8">
        <strong>Facilitator tip:</strong> Once the session starts, resist the urge to help. If the user asks a direct question like "should I click here?", redirect with "What would you expect to happen?" Your job is to observe, not guide.
      </div>

      <NavButtons
        onBack={onBack}
        onNext={onNext}
        nextLabel="Start the session →"
        nextHint={!allChecked ? "Check all items to confirm you're ready" : null}
      />
    </div>
  )
}
