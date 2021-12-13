import { useDispatch, useSelector } from "react-redux";
import { RightPanelModal, setModal } from "../../redux/rightPanelReducer";
import { RootState } from "../../redux/store";

const ToggleFontManagerButton = () => {
  const dispatch = useDispatch();
  const role = useSelector((state: RootState) => state.userReducer.role);
  return (
    <>
      {role === "DEVELOPER" && (
        <div className="left-panel__white-wrapper left-panel__flex left-panel__flex--justify-center left-panel__flex--align-center">
          <button
            onClick={() => {
              dispatch(setModal(RightPanelModal.FONT));
            }}
          >
            Font Manager
          </button>
        </div>
      )}
    </>
  );
};

export default ToggleFontManagerButton;
