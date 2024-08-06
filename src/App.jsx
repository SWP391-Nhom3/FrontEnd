import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./pages/Header";
import Home from "./pages/Home";
import MainFooter from "./components/Footer";
const App = () => {
  return (
    <div className="container mx-auto px-2 py-4">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
      <MainFooter />
    </div>
  );
};

export default App;
