// @ts-nocheck
import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    // Still log it so it shows up in the browser console / Vercel logs
    console.error("App crashed:", error, info);
  }

  render() {
    if (this.state.error) {
      return (
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#0b0b0f",
            color: "#f5f5f5",
            fontFamily: "system-ui, sans-serif",
            padding: "2rem",
            textAlign: "center",
          }}
        >
          <div style={{ maxWidth: 560 }}>
            <h1 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>
              Something went wrong loading the site.
            </h1>
            <p style={{ opacity: 0.8, marginBottom: "1rem" }}>
              {this.state.error.message}
            </p>
            <p style={{ opacity: 0.6, fontSize: "0.9rem" }}>
              This is usually caused by missing environment variables (e.g.
              Firebase config) in the deployment settings.
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
