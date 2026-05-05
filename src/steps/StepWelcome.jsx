export default function StepWelcome({ onNext }) {
  return (
    <div className="text-center">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-indigo-100 mb-6">
        <svg className="w-8 h-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      </div>

      <h1 className="text-4xl font-bold text-slate-800 mb-3">
        Usability Test Wizard
      </h1>
      <p className="text-lg text-slate-500 mb-10 max-w-md mx-auto leading-relaxed">
        A guided walkthrough for running your first thinking-aloud usability test — from setting a goal to interpreting results.
      </p>

      <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-8 text-left shadow-sm">
        <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-widest mb-4">
          What you'll do today
        </h2>
        <ul className="space-y-3">
          {[
            { icon: '🎯', label: 'Set a test goal', desc: 'Define what you want to learn from this session' },
            { icon: '🪑', label: 'Set up the session', desc: 'Prepare your prototype and brief your test user' },
            { icon: '👂', label: 'Run the thinking-aloud test', desc: 'Observe and take notes while the user explores' },
            { icon: '📋', label: 'Collect a SUS survey', desc: 'Have the user rate the experience with 10 questions' },
            { icon: '📊', label: 'Interpret your results', desc: 'Understand what the data tells you about your design' },
          ].map(({ icon, label, desc }) => (
            <li key={label} className="flex gap-3 items-start">
              <span className="text-xl mt-0.5">{icon}</span>
              <div>
                <span className="font-semibold text-slate-700">{label}</span>
                <span className="text-slate-400"> — {desc}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-xl px-5 py-4 text-sm text-amber-800 text-left mb-8">
        <strong>Before you start:</strong> Make sure your prototype is ready to open and you have a test user sitting with you (or nearby).
      </div>

      <button
        onClick={onNext}
        className="cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-8 py-3.5 rounded-xl transition-colors text-base shadow-sm"
      >
        Let's begin →
      </button>
    </div>
  )
}
