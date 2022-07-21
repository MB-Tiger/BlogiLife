
export default function ErrorFallback({error, resetErrorBoundary}) {
  return (
    <div className="text-center" role="alert">
      <p className="text-2xl">Something went wrong:</p>
      <pre className="text-4xl">{error.message}</pre>
      <button
        className="text-white bg-red-600 hover:bg-red-700 transition-all p-2"
        onClick={resetErrorBoundary}
      >
        Try again
      </button>
    </div>
  )
}