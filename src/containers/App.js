import React from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import Page from "../components/Page";
import NavPanel from "../components/NavPanel";
import NotFound from "../components/Errors/NotFound";
import { getPhotos } from "../actions/PageActions";
import { handleLogin, handleLogout, getAvatar } from "../actions/UserActions";

function App(props) {
  const {
    user,
    // page,
    // getPhotosActions,
    handleLoginAction,
    handleLogoutAction,
    handleGetAvatarAction,
  } = props;
  return (
    <div className="app">
      <Router>
        <NavPanel
          user={user}
          handleLogin={handleLoginAction}
          handleLogout={handleLogoutAction}
          handleGetAvatar={handleGetAvatarAction}
        />
        <Switch>
          <Route component={NotFound} />
        </Switch>
      </Router>
      {/* <Page
        photos={page.photos}
        year={page.year}
        isFetching={page.isFetching}
        getPhotos={getPhotosActions}
      /> */}
    </div>
  );
}

const mapStateToProps = (store) => {
  return {
    user: store.user,
    page: store.page,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getPhotosActions: (year) => dispatch(getPhotos(year)),
    handleLoginAction: () => dispatch(handleLogin()),
    handleLogoutAction: () => dispatch(handleLogout()),
    handleGetAvatarAction: (userId) => dispatch(getAvatar(userId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
