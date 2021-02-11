import React from "react";
import {
  Button,
  // Row,
  // ButtonGroup,
  // UncontrolledDropdown,
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
    };
  }

  toggle = () => this.setState({ dropdownOpen: !this.state.dropdownOpen });

  componentDidUpdate() {
    const { avatarIsLoaded, isFetching, userId } = this.props;
    if (!avatarIsLoaded && !isFetching && userId) {
      this.props.handleGetAvatar(this.props.userId);
    }
  }

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
      return (
        <Media>
          <Media left>
            <Media object src={this.props.avatar} alt="Generic placeholder image" />
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
  error: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  userId: PropTypes.string.isRequired,
  avatarIsLoaded: PropTypes.bool.isRequired,
  avatar: PropTypes.string.isRequired,
  handleLogin: PropTypes.func.isRequired,
  handleLogout: PropTypes.func.isRequired,
  handleGetAvatar: PropTypes.func.isRequired,
};
