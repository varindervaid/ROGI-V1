interface TourProgressProps {
  currentStep: number
  totalSteps: number
}

export function TourProgress({ currentStep, totalSteps }: TourProgressProps) {
  const progress = ((currentStep + 1) / totalSteps) * 100

  return (
    <div className="w-full h-1 bg-gray-200 rounded-full mb-3 mt-1">
      <div
        className="h-full bg-primary rounded-full transition-all duration-500 ease-in-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}
