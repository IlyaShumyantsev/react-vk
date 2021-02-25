import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const InfoModal = ({ props }) => {
  const [modal, setModalState] = useState(true);
  const toggle = () => setModalState(!modal);

  const { title, message } = props;

  return (
    <div>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>{title}</ModalHeader>
        <ModalBody>{message}</ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>
            Понятно
          </Button>
          <Button color="secondary" onClick={toggle}>
            Отмена
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default InfoModal;

InfoModal.propTypes = {
  props: PropTypes.object.isRequired,
  title: PropTypes.string,
  message: PropTypes.string,
};
