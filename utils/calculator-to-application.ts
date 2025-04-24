export function navigateToApplication(router: any, calculatorType: string, calculatorData: Record<string, any>) {
  // Convert calculator data to URL parameters
  const params = new URLSearchParams()

  // Add calculator type
  params.append("calculatorType", calculatorType)

  // Add all calculator data as parameters
  Object.entries(calculatorData).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      params.append(key, value.toString())
    }
  })

  // Navigate to the appropriate application page based on calculator type
  let applicationPath = "/apply/purchase"

  // Make sure the renewal path is correct
  if (calculatorType === "refinance") {
    applicationPath = "/apply/refinance"
  } else if (calculatorType === "renewal") {
    applicationPath = "/apply/renew"
  } else if (calculatorType === "pre-approval") {
    applicationPath = "/apply/pre-approval"
  }

  // Navigate to the application page with the parameters
  if (router && typeof router.push === "function") {
    router.push(`${applicationPath}?${params.toString()}`)

    // Use setTimeout instead of .then() to avoid issues if push doesn't return a Promise
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" })
    }, 100)
  } else {
    console.error("Router is not available or push method is not a function")
    // Fallback navigation if router is not available
    if (typeof window !== "undefined") {
      window.location.href = `${applicationPath}?${params.toString()}`
    }
  }
}
