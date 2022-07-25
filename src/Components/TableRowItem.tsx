import { useState } from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { changeTransaction, deleteItem } from "../redux/slice";
import { tableRowItemProps } from "../types";
import EditModal from "./EditModal";

function TableRowItem({ item }: tableRowItemProps) {
  const dispatch = useAppDispatch();
  const textInput = useAppSelector((state) => state.data.input);

  const ID = item.split(",")[0];
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const handleCloseEditModal = () => setShowEditModal(false);
  const handleShowEditModal = () => setShowEditModal(true);
  const saveTransactionChanges = () => {
    dispatch(changeTransaction({ id: ID, text: textInput }));
    setShowEditModal(false);
  };

  const deleteTransaction = () => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm("Do you want to delete this transaction?")) {
      dispatch(deleteItem(ID));
    }
  };

  return (
    <>
      <tr>
        {item.split(",").map((item: string) => {
          return <td key={item}>{item}</td>;
        })}
        <td>
          <ButtonGroup aria-label='Basic example'>
            <Button onClick={handleShowEditModal}>EDIT</Button>
            <Button onClick={deleteTransaction}>DELETE</Button>
          </ButtonGroup>
        </td>
      </tr>
      <EditModal
        showEditModal={showEditModal}
        handleCloseEditModal={handleCloseEditModal}
        saveTransactionChanges={saveTransactionChanges}
      />
    </>
  );
}

export default TableRowItem;
