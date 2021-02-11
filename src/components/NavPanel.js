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

  const { name, error, isFetching } = user;

  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">react-vk</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="/components/">Components</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="https://github.com/reactstrap/reactstrap">GitHub</NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Options
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>Option 1</DropdownItem>
                <DropdownItem>Option 2</DropdownItem>
                <DropdownItem divider />
                <DropdownItem>Reset</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>

          <Auth
            name={name}
            error={error}
            isFetching={isFetching}
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
