import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CarParts from './pages/CarParts';
import Pricing from "./pages/Prices";
import Contact from "./pages/Contact";
import './App.css';

const App = () => {

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/CarParts" element={<CarParts />} />
        <Route path="/Prices" element={<Pricing />}/>
        <Route path="/Contact" element={<Contact />}/>
      </Routes>
      <Footer />
    </Router>
  )
}

export default App