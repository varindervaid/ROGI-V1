"use client"

interface PageIntroductionProps {
  title: string
  description: string
}

export default function PageIntroduction({ title, description }: PageIntroductionProps) {
  return (
    <div className="mb-8">
      {title && <h1 className="text-3xl font-bold mb-2">{title}</h1>}
      {description && <p className="text-gray-600">{description}</p>}
    </div>
  )
}
