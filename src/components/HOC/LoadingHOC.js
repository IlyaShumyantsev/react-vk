import React, { Component } from "react";
import { DOTS_LOADER } from "../../constants/loadersConstants";
import { FACEBOOK_LOADER } from "../../constants/loadersConstants";
import DotsLoader from "../Loaders/DotsLoader";
import FacebookLoader from "../Loaders/FacebookLoader";

const getLoader = (loader) => {
  switch (loader) {
    case DOTS_LOADER: {
      return <DotsLoader />;
    }
    case FACEBOOK_LOADER: {
      return <FacebookLoader />;
    }
    default: {
      return <div>Загрузка</div>;
    }
  }
};

const LoadingHOC = (loader) => (WrappedComponent) => {
  return class LoadingHOC extends Component {
    render() {
      // eslint-disable-next-line react/prop-types
      const { isFetching } = this.props;
      return isFetching ? getLoader(loader) : <WrappedComponent {...this.props} />;
    }
  };
};

export default LoadingHOC;
