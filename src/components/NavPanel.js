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
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  useEffect(() => {
    handleNavbar(user.isLogin);
  }, [handleNavbar, user]);

  const { name, error, isFetching, userId, avatarIsLoaded, avatar } = user;
  const { title } = navbar;

  return (
    <div>
      <Navbar color="warning" light expand="md">
        <NavbarBrand href="/">react-vk</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            {Object.keys(Object.fromEntries(title)).map((item, i) => {
              return Object.fromEntries(title)[item] === "/photos" ? (
                <Link
                  className="nav-link"
                  onClick={() => getPhotos(null)}
                  key={i}
                  to={Object.fromEntries(title)[item]}
                >
                  {item}
                </Link>
              ) : (
                <Link className="nav-link" key={i} to={Object.fromEntries(title)[item]}>
                  {item}
                </Link>
              );
            })}
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
  handleLogin: PropTypes.func.isRequired,
  handleLogout: PropTypes.func.isRequired,
  handleGetAvatar: PropTypes.func.isRequired,
};
