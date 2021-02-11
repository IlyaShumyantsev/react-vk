import React from "react";
import {
  Button,
  Row,
  ButtonGroup,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
  ButtonDropdown,
  Media,
} from "reactstrap";
import PropTypes from "prop-types";
import DotsLoader from "../Loaders/DotsLoader";
import InfoModal from "../Modals/InfoModal";

class Auth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownOpen: false,
      ava: "",
    };
  }

  toggle = () => this.setState({ dropdownOpen: !this.state.dropdownOpen });

  render() {
    if (this.props.error) {
      return (
        <div>
          <InfoModal props={{ message: this.props.error, title: "Ошибка входа" }}></InfoModal>
          <Button outline color="primary" onClick={this.props.handleLogin}>
            Войти
          </Button>
        </div>
      );
    }
    if (this.props.isFetching) {
      return <DotsLoader></DotsLoader>;
    }
    if (this.props.name) {
      this.props.handleGetAva(this.props.userId);
      return (
        // <Row>
        //   <ButtonGroup>
        //     <Button disabled>{this.props.name}</Button>
        //     <Button outline color="danger" onClick={this.props.handleLogout}>
        //       Выйти
        //     </Button>
        //   </ButtonGroup>
        // </Row>
        <Media>
          <Media left href="#">
            {/* <Media object data-src={this.props.handleGetAva} alt="Generic placeholder image" /> */}
          </Media>
          <Media body>
            <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
              <Button disabled id="caret" color="success">
                {this.props.name}
              </Button>
              <DropdownToggle split color="success" />
              <DropdownMenu>
                <DropdownItem disabled>Действие 1</DropdownItem>
                <DropdownItem disabled>Действие 2</DropdownItem>
                <DropdownItem disabled>Действие 3</DropdownItem>
                <DropdownItem divider />
                <DropdownItem onClick={this.props.handleLogout}>Выйти</DropdownItem>
              </DropdownMenu>
            </ButtonDropdown>
          </Media>
        </Media>
      );
    }
    return (
      <Button outline color="primary" onClick={this.props.handleLogin}>
        Войти
      </Button>
    );
  }
}

export default Auth;

Auth.propTypes = {
  name: PropTypes.string.isRequired,
  error: PropTypes.string,
  isFetching: PropTypes.bool.isRequired,
  handleLogin: PropTypes.func.isRequired,
  handleLogout: PropTypes.func.isRequired,
};
