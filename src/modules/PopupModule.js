import { Modal } from 'react-bootstrap';

const PopupModule = ({children, handleClose, isShow}) => {
  return (
    <>
       <Modal
          show={isShow}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>

          </Modal.Header>
          <Modal.Body>
            {children}
          </Modal.Body>
        </Modal>
    </>
  )
};

export default PopupModule;