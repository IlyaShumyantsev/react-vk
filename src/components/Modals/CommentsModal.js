import React from "react";
import PropTypes from "prop-types";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const CommetnsModal = ({ modal, handleCommentsModal }) => {
  const onToggle = () => handleCommentsModal(!modal.isOpen, null);

  const style = {
    image: { width: "34px", height: "34px" },
  };

  return (
    <Modal isOpen={modal.isOpen} toggle={onToggle} width="400px">
      <ModalHeader toggle={onToggle}>Комментарии к фото</ModalHeader>
      {modal?.comments?.map((comment, index) => (
        <ModalBody key={index}>
          <div className="media border p-3">
            <img
              src={comment.user[0].photo_50}
              alt="John Doe"
              className="mr-3 mt-3 rounded-circle"
              style={style.image}
            />
            <div className="media-body">
              <h4>
                {comment.user[0].first_name}&nbsp;
                <small>
                  <i className="text-primary">{new Date(comment.date * 1000).toLocaleString()}</i>
                </small>
              </h4>
              {comment?.text}
              <br></br>
              {comment.attachments &&
                comment.attachments.map((attachment, index) => (
                  <div key={index}>
                    {attachment.photo && (
                      <img
                        src={attachment.photo?.sizes[attachment.photo?.sizes.length - 1].url}
                        alt=""
                        height="190px"
                        className="m-1"
                      />
                    )}
                    {attachment.sticker && (
                      <img
                        src={attachment.sticker?.images[attachment.sticker?.images.length - 1].url}
                        alt=""
                        height="200px"
                        className="m-1"
                      />
                    )}
                    {attachment.audio && (
                      <video controls name="media">
                        <source type="audio/mpeg" src={attachment.audio.url} />
                      </video>
                    )}
                  </div>
                ))}
            </div>
          </div>
        </ModalBody>
      ))}
      <ModalFooter>
        <Button color="danger" onClick={onToggle}>
          Закрыть
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default CommetnsModal;

CommetnsModal.propTypes = {
  modal: PropTypes.object.isRequired,
  handleCommentsModal: PropTypes.func.isRequired,
};
