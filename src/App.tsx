import { useEffect } from "react";
import { useDispatch } from "react-redux";
import LeftPanel from "./components/leftPanel/LeftPanel";
import Popup from "./components/popup/Popup";
import FontInjection from "./components/rightPanel/fontManagerUtils/FontInjection";
import RightPanel from "./components/rightPanel/RightPanel";
import { switchRole } from "./redux/userReducer";
import "./styles/index.scss";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get("role") === "DEVELOPER") {
      dispatch(switchRole("DEVELOPER"));
    }
  }, []);
  return (
    <div className="App">
      <FontInjection />
      <LeftPanel />
      <RightPanel />
      <Popup />
    </div>
  );
}

export default App;
