export default function Stepper({ steps, current }) {
  return (
    <div className="stepper">
      {steps.map((step,i) => {
        const n=i+1, isDone=n<current, isActive=n===current
        return (
          <div key={step} className={`step ${isDone?'done':''} ${isActive?'active':''}`}>
            <div className="step-circle">{isDone?'✓':n}</div>
            <div className="step-label">{step}</div>
            {i<steps.length-1 && <div className="step-line" />}
          </div>
        )
      })}
    </div>
  )
}
