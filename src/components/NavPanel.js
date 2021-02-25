import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, DropdownItem } from "reactstrap";
import { AuthUI } from "./User/Auth";
import LinkHOC from "./HOC/LinkHOC";

const NavPanel = ({
  user,
  navbar,
  getPhotos,
  handleLogin,
  handleLogout,
  handleGetAvatar,
  handleNavbar,
}) => {
  const [isOpen, setCollapseState] = useState(false);
  const toggle = () => setCollapseState(!isOpen);

  useEffect(() => {
    handleNavbar(user.isLogin);
  }, [handleNavbar, user]);

  const { name, error, isFetching, userId, avatarIsLoaded, avatar } = user;
  const { title } = navbar;

  function navElementsRender() {
    let [main, wall, photos, music, git] = ["Главная", "Стена", "Фото", "Музыка", "GitHub"];

    return Object.keys(Object.fromEntries(title)).map((item, i) => {
      switch (item) {
        case main: {
          return (
            <LinkHOC key={i} to={Object.fromEntries(title)[item]}>
              {item}
            </LinkHOC>
          );
        }
        case wall: {
          return (
            <LinkHOC key={i} to={Object.fromEntries(title)[item]}>
              {item}
            </LinkHOC>
          );
        }
        case photos: {
          return (
            <LinkHOC key={i} onClick={() => getPhotos(null)} to={Object.fromEntries(title)[item]}>
              {item}
            </LinkHOC>
          );
        }
        case music: {
          return (
            <LinkHOC key={i} to={Object.fromEntries(title)[item]}>
              {item}
            </LinkHOC>
          );
        }
        case git: {
          return (
            <LinkHOC
              key={i}
              to={""}
              target={"_blank"}
              onClick={() => window.open(Object.fromEntries(title)[item])}
            >
              {item}
            </LinkHOC>
          );
        }
        default: {
          return null;
        }
      }
    });
  }

  return (
    <div>
      <Navbar color="warning" light expand="md">
        <NavbarBrand href="/">react-vk</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            {navElementsRender()}
          </Nav>
          <DropdownItem divider />
          <AuthUI
            name={name}
            error={error}
            isFetching={isFetching}
            userId={userId}
            avatarIsLoaded={avatarIsLoaded}
            avatar={avatar}
            handleLogin={handleLogin}
            handleLogout={handleLogout}
            handleGetAvatar={handleGetAvatar}
          ></AuthUI>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default NavPanel;

NavPanel.propTypes = {
  user: PropTypes.object.isRequired,
  navbar: PropTypes.object.isRequired,
  getPhotos: PropTypes.func.isRequired,
  handleLogin: PropTypes.func.isRequired,
  handleLogout: PropTypes.func.isRequired,
  handleGetAvatar: PropTypes.func.isRequired,
  handleNavbar: PropTypes.func.isRequired,
};
