import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  // UncontrolledDropdown,
  // DropdownToggle,
  // DropdownMenu,
  // DropdownItem,
} from "reactstrap";
import Auth from "./User/Auth";

// import { Link } from "react-router-dom";

const NavPanel = ({ user, handleLogin, handleLogout, handleGetAvatar }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const { name, error, isFetching, userId, avatarIsLoaded, avatar } = user;

  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">react-vk</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="/">Главная</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="https://github.com/IlyaShumyantsev/react-vk/tree/develop">
                GitHub
              </NavLink>
            </NavItem>
          </Nav>

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
