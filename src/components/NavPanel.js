import React, { useEffect, useState } from "react";
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
  DropdownItem,
} from "reactstrap";
import Auth from "./User/Auth";

const NavPanel = ({ user, navbar, handleLogin, handleLogout, handleGetAvatar, handleNavbar }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  useEffect(() => {
    if (user.isLogin && user.isFetching) {
      handleNavbar(user.isLogin);
    }
  });

  const { name, error, isFetching, userId, avatarIsLoaded, avatar } = user;
  const { title } = navbar;

  return (
    <div>
      <Navbar color="warning" light expand="md">
        <NavbarBrand href="/">react-vk</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            {Object.keys(Object.fromEntries(title)).map((item, i) => (
              <NavLink key={i} href={Object.fromEntries(title)[item]}>
                {item}
              </NavLink>
            ))}
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
