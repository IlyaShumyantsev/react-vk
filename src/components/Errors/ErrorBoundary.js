import React, { Component } from "react";
import ErrorTemplate from "./ErrorTemplate";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // checks if an error has occured in its children.
      hasError: false,
    };
  }
  componentDidCatch(err, info) {
    // set the the hasError state to true so on the next render it will display the `<div>Error occured.</div>` in the DOM.
    this.setState({ hasError: true });
  }
  render() {
    if (this.state.hasError) {
      // if the hasError state boolean is true, it returns this to tell the user an error has occurred
      return <ErrorTemplate />;
    } else {
      // if there is no error the children components are returned so there are rendered.
      // eslint-disable-next-line react/prop-types
      return this.props.children;
    }
  }
}

export default ErrorBoundary;
