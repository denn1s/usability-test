import NavButtons from './NavButtons'

const EXAMPLES = [
  'The user can find a game that matches their age group and add it to their wishlist without any help.',
  'The user can browse the store, identify a game on sale, and start the purchase flow.',
  "The user can navigate to the \"Recommended for You\" section and open a game's detail page.",
]

export default function StepGoal({ data, onUpdate, onNext, onBack }) {
  const isValid = data.goal.trim().length > 10

  return (
    <div>
      <div className="mb-8">
        <span className="inline-block bg-indigo-100 text-indigo-700 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-widest mb-3">
          Step 1 — Goal
        </span>
        <h1 className="text-3xl font-bold text-slate-800 mb-2">
          What do you want to learn?
        </h1>
        <p className="text-slate-500 leading-relaxed">
          A test goal defines the task your user will attempt. It should be specific, realistic, and observable — you need to be able to tell whether or not they succeeded.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 mb-5">
        <label className="block text-sm font-semibold text-slate-600 mb-2">
          Test goal
        </label>
        <p className="text-xs text-slate-400 mb-3">
          Write it as something the user should be able to do, not a question you want to answer.
        </p>
        <textarea
          value={data.goal}
          onChange={(e) => onUpdate('goal', e.target.value)}
          placeholder="e.g. The user can find a game that fits their age group and add it to their wishlist without help."
          rows={4}
          className="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-300 resize-none placeholder-slate-300 transition"
        />

        <div className="mt-4 border-t border-slate-100 pt-4">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">
            Tips for a good test goal
          </p>
          <ul className="space-y-2 text-sm text-slate-500">
            <li className="flex gap-2">
              <span className="text-green-500 font-bold">✓</span>
              <span><strong className="text-slate-600">Specific:</strong> mentions a concrete feature or action, not "use the app."</span>
            </li>
            <li className="flex gap-2">
              <span className="text-green-500 font-bold">✓</span>
              <span><strong className="text-slate-600">Observable:</strong> you can clearly tell success from failure.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-green-500 font-bold">✓</span>
              <span><strong className="text-slate-600">Realistic:</strong> something this user would actually want to do.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-red-400 font-bold">✗</span>
              <span><strong className="text-slate-600">Avoid:</strong> leading the user ("click the wishlist button to add a game").</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mb-8">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">Examples</p>
        <ul className="space-y-2">
          {EXAMPLES.map((ex) => (
            <li key={ex} className="text-xs text-slate-500 leading-relaxed flex gap-2">
              <span className="text-slate-300 mt-0.5">→</span>
              <button
                className="text-left hover:text-indigo-600 transition-colors cursor-pointer"
                onClick={() => onUpdate('goal', ex)}
              >
                {ex}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <NavButtons
        onBack={onBack}
        onNext={onNext}
        nextDisabled={!isValid}
        nextLabel="Continue to Setup →"
        nextHint={!isValid ? 'Write your test goal to continue' : null}
      />
    </div>
  )
}
