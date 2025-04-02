import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import CarParts from './pages/CarParts';
import './App.css';

const App = () => {

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/CarParts" element={<CarParts />} />
      </Routes>
    </Router>
  )
}

export default App