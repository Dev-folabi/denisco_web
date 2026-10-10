"use client";

/**
 * The last resort: an error thrown by the root layout itself, which replaces
 * it — so this file carries its own `<html>` and `<body>`, and cannot rely on
 * the fonts, styles or providers the layout sets up.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100dvh",
          display: "grid",
          placeItems: "center",
          background: "#FAF6EC",
          color: "#163A1F",
          fontFamily:
            "system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
          padding: "24px",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: 420 }}>
          <h1 style={{ fontSize: 26, margin: "0 0 10px" }}>
            DENISCO is temporarily unavailable
          </h1>
          <p style={{ fontSize: 14, color: "#6B6456", margin: "0 0 24px" }}>
            Something went wrong while loading the site. Please try again in a
            moment.
          </p>
          {error.digest && (
            <p style={{ fontSize: 11, color: "#6B6456", margin: "0 0 20px" }}>
              Reference: {error.digest}
            </p>
          )}
          <button
            type="button"
            onClick={reset}
            style={{
              border: 0,
              cursor: "pointer",
              borderRadius: 999,
              background: "#163A1F",
              color: "#fff",
              fontSize: 14,
              fontWeight: 700,
              padding: "12px 26px",
            }}
          >
            Reload
          </button>
        </div>
      </body>
    </html>
  );
}
