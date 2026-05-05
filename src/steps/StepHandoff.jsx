import NavButtons from './NavButtons'

export default function StepHandoff({ onNext, onBack }) {
  return (
    <div className="text-center">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-violet-100 mb-6">
        <svg className="w-8 h-8 text-violet-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
        </svg>
      </div>

      <h1 className="text-3xl font-bold text-slate-800 mb-3">
        Hand the device to your test user
      </h1>
      <p className="text-slate-500 text-base leading-relaxed mb-8 max-w-md mx-auto">
        The thinking-aloud session is done. Now we'll collect a short survey from your test user — the <strong>System Usability Scale (SUS)</strong>.
      </p>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 mb-5 text-left">
        <p className="text-sm font-semibold text-slate-600 mb-3">Say this to your test user:</p>
        <blockquote className="bg-violet-50 border-l-4 border-violet-300 px-5 py-4 rounded-r-xl text-sm text-slate-700 leading-relaxed italic">
          "Thank you! One last thing — we'd like you to fill out a short 10-question survey about your experience with the design. There are no right or wrong answers. Just rate each statement based on how you personally felt. It takes about 2 minutes."
        </blockquote>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 mb-8 text-left">
        <p className="text-sm font-semibold text-slate-600 mb-3">What is the SUS?</p>
        <p className="text-sm text-slate-500 leading-relaxed mb-3">
          The <strong className="text-slate-600">System Usability Scale</strong> is a standardized questionnaire developed by John Brooke in 1986. It consists of 10 short statements rated on a 1–5 scale (Strongly Disagree to Strongly Agree). It produces a score from 0–100 that benchmarks how usable a system feels.
        </p>
        <p className="text-sm text-slate-500 leading-relaxed">
          It's one of the most widely used tools in usability research because it's quick, reliable, and lets you compare results across different designs and studies.
        </p>
      </div>

      <div className="flex flex-col items-center gap-3">
        <button
          onClick={onNext}
          className="cursor-pointer bg-violet-600 hover:bg-violet-700 text-white font-semibold px-8 py-3.5 rounded-xl transition-colors text-base shadow-sm w-full max-w-xs"
        >
          Open the survey for the user →
        </button>
        <button
          onClick={onBack}
          className="cursor-pointer text-slate-400 hover:text-slate-600 text-sm transition-colors"
        >
          ← Go back to notes
        </button>
      </div>
    </div>
  )
}
