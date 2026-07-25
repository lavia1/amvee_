import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import Footer from "./components/Footer";
import CarParts from './pages/CarParts';
import { PartsProvider } from "./context/PartsContext";
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
import ScrollToTop from "./components/ScrollTop";
import './App.css';



const CancelPage = () => (
  <div>
      <h1>Tilaus peruutettu</h1>
      <p>Tilauksesi on peruutettu. Yritä uudelleen.</p>
  </div>
); 

const NotFound = () => (
  <div style={{ padding: "2rem", textAlign: "center" }}>
    <h1>404</h1>
    <p>Sivua ei löytynyt.</p>
  </div>
);

const App = () => {

  return (
    <PartsProvider>
    <CartProvider>
      <Router>
        <ScrollToTop />
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/Prices" element={<Navigate to="/Hinnasto" replace />} />
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
          <Route path="*" element={<NotFound />} />
          
          
        </Routes>
        <Footer />
      </Router>
    </CartProvider>
    </PartsProvider>
  )
}

export default App