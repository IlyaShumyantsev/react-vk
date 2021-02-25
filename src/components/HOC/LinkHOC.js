import React, { Component } from "react";
import { Link } from "react-router-dom";

class LinkHOC extends Component {
  render() {
    return <Link {...this.props} className="nav-link" />;
  }
}

export default LinkHOC;
