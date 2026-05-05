export default function NavButtons({ onBack, onNext, nextDisabled, nextLabel = 'Continue →', nextHint, backLabel = '← Back' }) {
  return (
    <div className="flex items-center justify-between gap-4">
      {onBack ? (
        <button
          onClick={onBack}
          className="cursor-pointer text-slate-400 hover:text-slate-600 font-medium text-sm transition-colors px-2 py-1"
        >
          {backLabel}
        </button>
      ) : <div />}

      <div className="flex flex-col items-end gap-1">
        {nextHint && (
          <p className="text-xs text-slate-400">{nextHint}</p>
        )}
        <button
          onClick={onNext}
          disabled={nextDisabled}
          className={`font-semibold px-6 py-3 rounded-xl transition-all text-sm ${
            nextDisabled
              ? 'bg-slate-100 text-slate-300 cursor-not-allowed'
              : 'cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm'
          }`}
        >
          {nextLabel}
        </button>
      </div>
    </div>
  )
}
