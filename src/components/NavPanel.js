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
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import Auth from "./User/Auth";

import { Link } from "react-router-dom";

const NavPanel = ({ user, handleLogin, handleLogout, handleGetAva }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const { name, error, isFetching, userId } = user;

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
            handleLogin={handleLogin}
            handleLogout={handleLogout}
            handleGetAva={handleGetAva}
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
};

// export default class Nav extends React.Component {
//   render() {
//     return (
//       <nav className="navbar navbar-expand-md navbar-light bg-light sticky-top">
//         <div className="container-fluid"></div>
//       </nav>
//       // <div>
//       //   <Link to="/">Главная</Link>
//       //   <Link to="/login">Вход</Link>
//       // </div>
//     );
//   }
// }
