import Airtable from "airtable"

// Function to validate and configure Airtable
export function configureAirtable() {
  const airtableToken = process.env.AIRTABLE_TOKEN
  const airtableBaseId = process.env.AIRTABLE_BASE_ID

  if (!airtableToken) {
    throw new Error("Missing AIRTABLE_TOKEN environment variable")
  }

  if (!airtableBaseId) {
    throw new Error("Missing AIRTABLE_BASE_ID environment variable")
  }

  // Configure Airtable with the API key
  Airtable.configure({
    apiKey: airtableToken,
    endpointUrl: "https://api.airtable.com",
  })

  // Return the base with the base ID
  return Airtable.base(airtableBaseId)
}

// Function to get the Users table
export function getUsersTable() {
  const base = configureAirtable()
  return base("Users")
}
