import { memo } from "react";
import { useSelector } from "react-redux";
import { RightPanelModal } from "../../redux/rightPanelReducer";
import { RootState } from "../../redux/store";
import "../../styles/RightPanel.scss";
import Entry from "./Entry";
import Route from "./Route";
import Template from "./Template";
import TrashCan from "./TrashCan";

const RightPanel = memo(() => {
  const modal = useSelector(
    (state: RootState) => state.rightPanelReducer.modal
  );
  return (
    <div className="right-panel">
      {modal === RightPanelModal.TRASHCAN && <TrashCan />}
      {modal === RightPanelModal.ENTRY && <Entry />}
      {modal === RightPanelModal.TEMPLATE && <Template />}
      {modal === RightPanelModal.ROUTE && <Route />}
    </div>
  );
});

export default RightPanel;
