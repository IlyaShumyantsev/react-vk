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
          <ModalBody key={index}>
            <span className="badge badge-primary">{comment.user[0].first_name}:</span>
            &nbsp;{comment?.text}
            <br></br>
            {comment.attachments &&
              comment.attachments.map((attachment) => (
                <img
                  src={attachment.photo?.sizes[attachment.photo?.sizes.length - 1].url}
                  alt=""
                  height="300px"
                ></img>
              ))}
          </ModalBody>
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
