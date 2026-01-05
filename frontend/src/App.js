import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import Footer from "./components/Footer";
import CarParts from './pages/CarParts';
import PartDetailsPage from "./pages/PartDetailsPage";
import Hinnasto from "./pages/Hinnasto";
import Yhteystiedot from "./pages/Yhteystiedot";
import Kuvagalleria from "./pages/Kuvagalleria";
import ShoppingCart from "./pages/ShoppingCart";
import Palvelut from "./pages/Palvelut";
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
          <Route path="/Palvelut" element={<Palvelut />} />
          <Route path="/Hinnasto" element={<Hinnasto />}/>
          <Route path="/CarParts" element={<CarParts />} />
          <Route path="/Kuvagalleria" element={<Kuvagalleria />} />
          <Route path="/parts/:partNumber" element={<PartDetailsPage />} />
          <Route path="/Yhteystiedot" element={<Yhteystiedot />}/>
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