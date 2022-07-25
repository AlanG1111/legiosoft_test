import { Button, FormControl, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { changeText } from "../redux/slice";
import { EditModalProps } from "../types";

const EditModal = ({
  showEditModal,
  handleCloseEditModal,
  saveTransactionChanges,
}: EditModalProps) => {
  const dispatch = useDispatch();

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(changeText(e.target.value));
  };

  return (
    <Modal show={showEditModal} onHide={handleCloseEditModal}>
      <Modal.Header closeButton>
        <Modal.Title>Change status</Modal.Title>
      </Modal.Header>

      <Modal.Footer>
        <FormControl
          placeholder='Transaction status'
          aria-label='Transaction status'
          aria-describedby='basic-addon1'
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleChangeInput(e)
          }
        />

        <Button onClick={handleCloseEditModal}>Close</Button>
        <Button onClick={saveTransactionChanges}>Save Changes</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditModal;
