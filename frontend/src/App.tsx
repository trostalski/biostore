import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import CreateMethod from "./pages/CreateMethod";
import Reagents from "./pages/Reagents";
import Devices from "./pages/Devices";
import ViewMethod from "./pages/ViewMethod";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/newmethod" element={<CreateMethod />}></Route>
          <Route path="/method" element={<ViewMethod />}></Route>
          <Route path="/reagents" element={<Reagents />}></Route>
          <Route path="/devices" element={<Devices />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
