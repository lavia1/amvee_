import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Services from "./pages/Services";
import CarParts from './pages/CarParts';
import PartDetailsPage from "./pages/PartDetailsPage";
import Pricing from "./pages/Prices";
import Contact from "./pages/Contact";
import ShoppingCart from "./pages/ShoppingCart";
import './App.css';


const App = () => {

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/Services" element={<Services />} />
        <Route path="/Prices" element={<Pricing />}/>
        <Route path="/CarParts" element={<CarParts />} />
        <Route path="/parts/:partNumber" element={<PartDetailsPage />} />
        <Route path="/Contact" element={<Contact />}/>
        <Route path="/ShoppingCart" element={<ShoppingCart />}></Route>
      </Routes>
      <Footer />
    </Router>
  )
}

export default App