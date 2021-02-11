import React from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Page from "../components/Page";
import NavPanel from "../components/NavPanel";
import NotFound from "../components/Errors/NotFound";
import { getPhotos } from "../actions/PageActions";
import { handleLogin, handleLogout, getAva } from "../actions/UserActions";

function App(props) {
  const {
    user,
    page,
    getPhotosActions,
    handleLoginAction,
    handleLogoutAction,
    handleGetAvaAction,
  } = props;
  return (
    <div className="app">
      <Router>
        <NavPanel
          user={user}
          handleLogin={handleLoginAction}
          handleLogout={handleLogoutAction}
          handleGetAva={handleGetAvaAction}
        />
        <Switch>
          {/* <Route
            path="/login"
            component={() => {
              return (
                <User
                  name={user.name}
                  isFetching={user.isFetching}
                  error={user.error}
                  handleLogin={handleLoginAction}
                />
              );
            }}
          /> */}
          <Route component={NotFound} />
        </Switch>
      </Router>
      {/* <Page
        photos={page.photos}
        year={page.year}
        isFetching={page.isFetching}
        getPhotos={getPhotosActions}
      /> */}
      {/* <User
        name={user.name}
        isFetching={user.isFetching}
        error={user.error}
        handleLogin={handleLoginAction}
      /> */}
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
    handleLogoutAction: () => dispatch(handleLogout()),
    handleGetAvaAction: () => dispatch(getAva()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
