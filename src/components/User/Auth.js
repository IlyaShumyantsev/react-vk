import React, { Component } from "react";
import {
  Button,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
  ButtonDropdown,
  Media,
} from "reactstrap";
import PropTypes from "prop-types";
import DotsLoader from "../Loaders/DotsLoader";
import InfoModal from "../Modals/InfoModal";

class Auth extends Component {
  state = {
    dropdownOpen: false,
  };

  toggle = () => this.setState({ dropdownOpen: !this.state.dropdownOpen });

  componentDidUpdate() {
    const { avatarIsLoaded, isFetching, userId } = this.props;
    if (!avatarIsLoaded && !isFetching && userId) {
      this.props.handleGetAvatar(this.props.userId);
    }
  }

  renderNavPanel = () => {
    const style = {
      image: { width: "32px", height: "32px" },
    };

    return (
      <Media className="align-middle d-flex h-100">
        <img
          alt="avatar"
          className="avatar rounded-circle align-self-center ml-3"
          src={this.props.avatar}
          style={style.image}
        ></img>
        <ButtonDropdown
          isOpen={this.state.dropdownOpen}
          toggle={this.toggle}
          className="align-middle justify-content-center align-self-center col"
        >
          <Button disabled id="caret" color="light">
            {this.props.name}
          </Button>
          <DropdownToggle split color="light" />
          <DropdownMenu>
            <DropdownItem disabled>Действие 1</DropdownItem>
            <DropdownItem disabled>Действие 2</DropdownItem>
            <DropdownItem disabled>Действие 3</DropdownItem>
            <DropdownItem divider />
            <DropdownItem onClick={this.props.handleLogout}>Выйти</DropdownItem>
          </DropdownMenu>
        </ButtonDropdown>
      </Media>
    );
  };

  render() {
    if (this.props.error) {
      return (
        <div>
          <InfoModal props={{ message: this.props.error, title: "Ошибка входа" }}></InfoModal>
          <Button outline color="light" onClick={this.props.handleLogin}>
            Войти
          </Button>
        </div>
      );
    }
    if (this.props.isFetching) {
      return <DotsLoader></DotsLoader>;
    } else if (this.props.name) {
      return this.renderNavPanel();
    }
    return (
      <Button outline color="light" onClick={this.props.handleLogin}>
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
