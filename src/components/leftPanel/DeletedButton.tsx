import { memo } from "react";
import { useDispatch } from "react-redux";
import { RightPanelModal, setModal } from "../../redux/rightPanelReducer";
import { AppDispatch } from "../../redux/store";

const DeletedButton = memo(() => {
  const dispatch = useDispatch<AppDispatch>();
  return (
    <div className="left-panel__white-wrapper left-panel__flex left-panel__flex--justify-center left-panel__flex--align-center">
      <button
        onClick={() => {
          dispatch(setModal(RightPanelModal.TRASHCAN));
        }}
      >
        Deleted Items
      </button>
    </div>
  );
});

export default DeletedButton;
