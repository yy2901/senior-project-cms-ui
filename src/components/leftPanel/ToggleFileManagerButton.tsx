import { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleFileManager } from "../../redux/fileManagerReducer";
import { AppDispatch, RootState } from "../../redux/store";

const ToggleFileManagerButton = memo(() => {
  const dispatch = useDispatch<AppDispatch>();
  const isOpen = useSelector(
    (state: RootState) => state.fileManagerReducer.open
  );
  return (
    <div className="left-panel__white-wrapper left-panel__flex left-panel__flex--justify-center left-panel__flex--align-center">
      <button
        onClick={() => {
          dispatch(toggleFileManager(!isOpen));
        }}
      >
        File Manager
      </button>
    </div>
  );
});

export default ToggleFileManagerButton;
