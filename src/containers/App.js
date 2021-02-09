import React from "react";
import { connect } from "react-redux";
import { User } from "../components/User";
import Page from "../components/Page";
import { getPhotos } from "../actions/PageActions";
import { handleLogin } from "../actions/UserActions";

function App(props) {
  const { user, page, getPhotosActions, handleLoginAction } = props;
  return (
    <div className="app">
      <Page
        photos={page.photos}
        year={page.year}
        isFetching={page.isFetching}
        getPhotos={getPhotosActions}
      />
      <User
        name={user.name}
        isFetching={user.isFetching}
        error={user.error}
        handleLogin={handleLoginAction}
      />
    </div>
  );
}

const mapStateToProps = (store) => {
  console.log(store);
  return {
    user: store.user,
    page: store.page,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getPhotosActions: (year) => dispatch(getPhotos(year)),
    handleLoginAction: () => dispatch(handleLogin()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
