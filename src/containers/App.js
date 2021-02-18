import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Photos from "../components/User/Photos";
import NavPanel from "../components/NavPanel";
import NotFound from "../components/Errors/NotFound";
import { getPhotos } from "../actions/PhotosActions";
import { handleLogin, handleLogout, getAvatar } from "../actions/UserActions";
import { handleNavbar } from "../actions/NavbarActions";

import { photoCommentsSelector } from "../selectors/photoCommentsSelector";

function App(props) {
  const {
    user,
    navbar,
    photos,
    getPhotosActions,
    handleLoginAction,
    handleLogoutAction,
    handleGetAvatarAction,
    handleNavbarAction,
    photosAndComments,
  } = props;
  return (
    <div className="app">
      <Router>
        <NavPanel
          user={user}
          navbar={navbar}
          getPhotos={getPhotosActions}
          handleLogin={handleLoginAction}
          handleLogout={handleLogoutAction}
          handleGetAvatar={handleGetAvatarAction}
          handleNavbar={handleNavbarAction}
        />
        <Switch>
          <Route exact path="/photos">
            <Photos
              photos={photos.photos}
              years={photos.years}
              isFetching={photos.isFetching}
              error={photos.error}
              getPhotos={getPhotosActions}
              photosAndComments={photosAndComments}
            />
          </Route>
          <Route component={NotFound} />
        </Switch>
      </Router>
    </div>
  );
}

const mapStateToProps = (store) => {
  return {
    user: store.user,
    photos: store.photos,
    navbar: store.navbar,
    photosAndComments: photoCommentsSelector(store.photos),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getPhotosActions: (year) => dispatch(getPhotos(year)),
    handleLoginAction: () => dispatch(handleLogin()),
    handleLogoutAction: () => dispatch(handleLogout()),
    handleGetAvatarAction: (userId) => dispatch(getAvatar(userId)),
    handleNavbarAction: (isLogin) => dispatch(handleNavbar(isLogin)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

App.propTypes = {
  user: PropTypes.object.isRequired,
  navbar: PropTypes.object.isRequired,
  photos: PropTypes.object.isRequired,
  getPhotosActions: PropTypes.func.isRequired,
  handleLoginAction: PropTypes.func.isRequired,
  handleLogoutAction: PropTypes.func.isRequired,
  handleGetAvatarAction: PropTypes.func.isRequired,
  handleNavbarAction: PropTypes.func.isRequired,
  photosAndComments: PropTypes.object.isRequired,
};
