import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
import ProtectedRoute from "./components/ProtectedRoute";
import SuccessPage from "./pages/SuccessPage";
import { CartProvider } from "./context/CartContext";
import './App.css';



const CancelPage = () => (
  <div>
      <h1>Tilaus peruutettu</h1>
      <p>Tilauksesi on peruutettu. Yritä uudelleen.</p>
  </div>
); 

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
          <Route path="/admin/login/456759" element={<AdminLogin />} />

          <Route path="/admin/dashboard" element={ <ProtectedRoute ><AdminDashboard /> </ProtectedRoute>} />
          <Route path="/success" element = {<SuccessPage />} />
          <Route path="/cancel" element = {<CancelPage />} />
        </Routes>
        <Footer />
      </Router>
    </CartProvider>
  )
}

export default App