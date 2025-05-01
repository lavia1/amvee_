import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import Footer from "./components/Footer";
import Services from "./pages/Services";
import CarParts from './pages/CarParts';
import PartDetailsPage from "./pages/PartDetailsPage";
import Pricing from "./pages/Prices";
import Contact from "./pages/Contact";
import ShoppingCart from "./pages/ShoppingCart";
import AdminLogin from "./pages/admin/AdminLoginPage";
import AdminDashboard from "./pages/admin/AdminDashboard";
import { CartProvider } from "./context/CartContext";
import './App.css';


const App = () => {

  return (
    <CartProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/Services" element={<Services />} />
          <Route path="/Prices" element={<Pricing />}/>
          <Route path="/CarParts" element={<CarParts />} />
          <Route path="/parts/:partNumber" element={<PartDetailsPage />} />
          <Route path="/Contact" element={<Contact />}/>
          <Route path="/ShoppingCart" element={<ShoppingCart />}></Route>
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Routes>
        <Footer />
      </Router>
    </CartProvider>
  )
}

export default App