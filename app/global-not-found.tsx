export default function GlobalNotFound() {
  return (
    <html>
      <body>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
            padding: "0 1rem",
            textAlign: "center",
            fontFamily:
              'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
          }}
        >
          <h1 style={{ fontSize: "3.75rem", fontWeight: "bold", color: "#111827", marginBottom: "1rem" }}>404</h1>
          <h2 style={{ fontSize: "1.5rem", fontWeight: "600", color: "#374151", marginBottom: "1.5rem" }}>
            Page Not Found
          </h2>
          <p style={{ color: "#4B5563", maxWidth: "28rem", marginBottom: "2rem" }}>
            We couldn't find the page you're looking for. The page might have been moved, deleted, or never existed.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <a
              href="/"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "0.375rem",
                backgroundColor: "#111827",
                padding: "0.5rem 1rem",
                fontSize: "0.875rem",
                fontWeight: "500",
                color: "white",
                textDecoration: "none",
                boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
              }}
            >
              Return Home
            </a>
            <a
              href="/contact"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "0.375rem",
                border: "1px solid #E5E7EB",
                backgroundColor: "white",
                padding: "0.5rem 1rem",
                fontSize: "0.875rem",
                fontWeight: "500",
                color: "#111827",
                textDecoration: "none",
                boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
              }}
            >
              Contact Support
            </a>
          </div>
        </div>
      </body>
    </html>
  )
}
