import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, DropdownItem } from "reactstrap";
import { Link } from "react-router-dom";
import Auth from "./User/Auth";

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
            <Link className="nav-link" key={i} to={Object.fromEntries(title)[item]}>
              {item}
            </Link>
          );
        }
        case wall: {
          return (
            <Link
              style={{ pointerEvents: "none" }}
              className="nav-link"
              key={i}
              to={Object.fromEntries(title)[item]}
            >
              {item}
            </Link>
          );
        }
        case photos: {
          return (
            <Link
              className="nav-link"
              onClick={() => getPhotos(null)}
              key={i}
              to={Object.fromEntries(title)[item]}
            >
              {item}
            </Link>
          );
        }
        case music: {
          return (
            <Link
              style={{ pointerEvents: "none" }}
              className="nav-link"
              key={i}
              to={Object.fromEntries(title)[item]}
            >
              {item}
            </Link>
          );
        }
        case git: {
          return (
            <Link
              className="nav-link"
              key={i}
              to={""}
              onClick={() => window.open(Object.fromEntries(title)[item])}
            >
              {item}
            </Link>
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
        <NavbarBrand to={"/"}>react-vk</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            {navElementsRender()}
          </Nav>
          <DropdownItem divider />
          <Auth
            name={name}
            error={error}
            isFetching={isFetching}
            userId={userId}
            avatarIsLoaded={avatarIsLoaded}
            avatar={avatar}
            handleLogin={handleLogin}
            handleLogout={handleLogout}
            handleGetAvatar={handleGetAvatar}
          ></Auth>
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
