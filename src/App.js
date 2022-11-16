import "./App.css";
import CryptoInfo from "./Components/CryptoInfo/CryptoInfo";
import Navbar from "./Components/Navbar/Navbar";
import SliderSection from "./Components/SliderSection/SliderSection";

function App() {
  return (
    <>
      <Navbar />
      <div className="App">
        {/* <SliderSection /> */}
        <CryptoInfo />
      </div>
    </>
  );
}

export default App;
