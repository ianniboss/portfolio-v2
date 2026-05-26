import React from "react";

/**
 * Lightweight error boundary used to wrap each 3D canvas / heavy section.
 * If any descendant throws (e.g. WebGL context loss, late prop mutations),
 * we hide the broken subtree instead of bringing down the whole page.
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // eslint-disable-next-line no-console
    console.warn("[ErrorBoundary] caught:", error?.message || error, info?.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? null;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
