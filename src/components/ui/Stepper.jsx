export default function Stepper({ steps, current }) {
  return (
    <div className="stepper">
      {steps.map((step, i) => {
        const n = i + 1
        const isDone   = n < current
        const isActive = n === current
        return (
          <div key={step} className={`step ${isDone ? 'done' : ''} ${isActive ? 'now' : ''}`}>
            <div className="step-ci">{isDone ? '✓' : n}</div>
            <div className="step-lb">{step}</div>
            {i < steps.length - 1 && <div className="step-ln" />}
          </div>
        )
      })}
    </div>
  )
}
