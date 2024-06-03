import React from "react";
import { Button, Image, Modal, Stack } from "react-bootstrap";
import { MdDelete } from "react-icons/md";
import "./image-modal.scss";

const ImageModal = ({ field, formik, image, show, onHide, index }) => {
  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton className="modal-header">
        <Stack direction="horizontal" gap={3} className="modal-header-div text-truncate">
          <div className="img-modal-title" title={image.name}>{image.name}</div>
          <div>
            <Button
              className="btn-link"
              onClick={() => {
                const updatedImages = [...formik.values[field]];
                updatedImages.splice(index, 1);
                formik.setFieldValue(field, updatedImages);
                onHide();
              }}
            >
              <MdDelete size={30} />
            </Button>
          </div>
            <div className="saperator"></div>
        </Stack>
      </Modal.Header>
      <Modal.Body>
        <Image fluid src={URL.createObjectURL(image)} />
      </Modal.Body>
    </Modal>
  );
};

export default ImageModal;
