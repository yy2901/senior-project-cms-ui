import { useDispatch } from "react-redux";
import { RightPanelModal, setModal } from "../../redux/rightPanelReducer";

const ToggleFontManagerButton = () => {
  const dispatch = useDispatch();
  return (
    <div className="left-panel__white-wrapper left-panel__flex left-panel__flex--justify-center left-panel__flex--align-center">
      <button
        onClick={() => {
          dispatch(setModal(RightPanelModal.FONT));
        }}
      >
        Font Manager
      </button>
    </div>
  );
};

export default ToggleFontManagerButton;
