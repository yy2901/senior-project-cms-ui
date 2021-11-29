import LeftPanel from "./components/leftPanel/LeftPanel";
import Popup from "./components/popup/Popup";
import FontInjection from "./components/rightPanel/fontManagerUtils/FontInjection";
import RightPanel from "./components/rightPanel/RightPanel";
import "./styles/index.scss";

function App() {
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
