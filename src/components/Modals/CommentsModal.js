import React from "react";
import PropTypes from "prop-types";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const CommetnsModal = ({ modal, handleCommentsModal }) => {
  const onToggle = () => handleCommentsModal(!modal.isOpen, null);

  return (
    <div>
      <Modal isOpen={modal.isOpen} toggle={onToggle}>
        <ModalHeader toggle={onToggle}>Комментарии к фото</ModalHeader>
        {modal?.comments?.map((comment, index) => (
          <ModalBody key={index}>{comment?.text}</ModalBody>
        ))}
        <ModalFooter>
          <Button color="danger" onClick={onToggle}>
            Закрыть
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default CommetnsModal;

CommetnsModal.propTypes = {
  modal: PropTypes.object.isRequired,
  handleCommentsModal: PropTypes.func.isRequired,
};
