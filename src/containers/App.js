import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { PhotosUI } from "../components/User/Photos";
import NavPanel from "../components/NavPanel";
import Main from "../components/Main/Main";
import NotFound from "../components/Errors/NotFound";
import ErrorBoundary from "../components/Errors/ErrorBoundary";
import { getPhotos } from "../actions/PhotosActions";
import { handleLogin, handleLogout, getAvatar, getUsers } from "../actions/UserActions";
import { handleNavbar } from "../actions/NavbarActions";
import { handleCommentsModal } from "../actions/ModalActions";
import { photoCommentsSelector } from "../selectors/photoCommentsSelector";

function App(props) {
  const {
    user,
    navbar,
    photos,
    modal,
    getPhotosActions,
    handleLoginAction,
    handleLogoutAction,
    handleGetAvatarAction,
    handleNavbarAction,
    photosAndComments,
    handleCommentsModalAction,
    getUsersAction,
  } = props;

  return (
    <ErrorBoundary>
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
              <PhotosUI
                years={photos.years}
                isFetching={photos.isFetching}
                error={photos.error}
                getPhotos={getPhotosActions}
                photosAndComments={photosAndComments}
                handleCommentsModal={handleCommentsModalAction}
                getUsers={getUsersAction}
                modal={modal}
                photos={photos}
              />
            </Route>
            <Route exact path="/">
              <Main />
            </Route>
            <Route component={NotFound} />
          </Switch>
        </Router>
      </div>
    </ErrorBoundary>
  );
}

const mapStateToProps = (store) => {
  return {
    user: store.user,
    photos: store.photos,
    navbar: store.navbar,
    photosAndComments: photoCommentsSelector(store.photos, store.user),
    modal: store.modal,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getPhotosActions: (year) => dispatch(getPhotos(year)),
    handleLoginAction: () => dispatch(handleLogin()),
    handleLogoutAction: () => dispatch(handleLogout()),
    handleGetAvatarAction: (userId) => dispatch(getAvatar(userId)),
    handleNavbarAction: (isLogin) => dispatch(handleNavbar(isLogin)),
    handleCommentsModalAction: (isOpen, comments) => {
      return dispatch(handleCommentsModal(isOpen, comments));
    },
    getUsersAction: (usersIds) => dispatch(getUsers(usersIds)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

App.propTypes = {
  user: PropTypes.object.isRequired,
  navbar: PropTypes.object.isRequired,
  photos: PropTypes.object.isRequired,
  modal: PropTypes.object.isRequired,
  getPhotosActions: PropTypes.func.isRequired,
  handleLoginAction: PropTypes.func.isRequired,
  handleLogoutAction: PropTypes.func.isRequired,
  handleGetAvatarAction: PropTypes.func.isRequired,
  handleNavbarAction: PropTypes.func.isRequired,
  handleCommentsModalAction: PropTypes.func.isRequired,
  photosAndComments: PropTypes.array.isRequired,
  getUsersAction: PropTypes.func.isRequired,
};
