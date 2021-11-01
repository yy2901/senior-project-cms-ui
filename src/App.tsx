import LeftPanel from "./components/leftPanel/LeftPanel";
import Popup from "./components/popup/Popup";
import RightPanel from "./components/rightPanel/RightPanel";
import "./styles/index.scss";

function App() {
  return (
    <div className="App">
      <LeftPanel />
      <RightPanel />
      <Popup />
    </div>
  );
}

export default App;
