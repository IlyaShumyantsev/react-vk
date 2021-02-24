import React, { Component } from "react";
import ErrorTemplate from "./ErrorTemplate";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }
  componentDidCatch(err, info) {
    this.setState({ hasError: true });
  }
  render() {
    if (this.state.hasError) {
      return <ErrorTemplate />;
    } else {
      // eslint-disable-next-line react/prop-types
      return this.props.children;
    }
  }
}

export default ErrorBoundary;
