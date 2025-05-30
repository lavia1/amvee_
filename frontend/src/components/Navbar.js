 import { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./Nav.css";

export default function Navbar() {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const { cart, removeFromCart } = useCart();
  const [showCartModal, setShowCartModal] = useState(false);
  const modalRef = useRef(null);

  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const showSidebar = () => setSidebarVisible(true);
  const hideSidebar = () => setSidebarVisible(false);

  useEffect(() => {
    function handleClickOutside(event) {
      if (showCartModal && modalRef.current && !modalRef.current.contains(event.target)) {
        setShowCartModal(false);
      }
    }

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        setShowCartModal(false);
      }
    }

    if (showCartModal) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [showCartModal]);

  return (
    <nav className="nav">
      {/* Overlay for sidebar */}
      <div className={`overlay ${sidebarVisible ? "show" : ""}`} onClick={hideSidebar}></div>

      {/* Sidebar for mobile navigation */}
      <ul className={`sidebar ${sidebarVisible ? "show" : ""}`}>
        <li className="menu-button" onClick={hideSidebar}>
          <button type="button" className="menu-button-icon">
            <i className="fa fa-fw fa-window-close" alt="Close Icon"></i>
          </button>
        </li>

        <li>
          <NavLink to="/" onClick={hideSidebar} className={(navData) => (navData.isActive ? "active-link" : "")}>
            Etusivu
          </NavLink>
        </li>
        <li>
          <NavLink to="/Services" onClick={hideSidebar} className={(navData) => (navData.isActive ? "active-link" : "")}>
            Palvelut
          </NavLink>
        </li>
        <li>
          <NavLink to="/Prices" onClick={hideSidebar} className={(navData) => (navData.isActive ? "active-link" : "")}>
            Hinnasto
          </NavLink>
        </li>
        <li>
          <NavLink to="/CarParts" onClick={hideSidebar} className={(navData) => (navData.isActive ? "active-link" : "")}>
            Osat
          </NavLink>
        </li>
        <li>
          <NavLink to="/Contact" onClick={hideSidebar} className={(navData) => (navData.isActive ? "active-link" : "")}>
            Yhteistiedot
          </NavLink>
        </li>
      </ul>

      {/* Main navbar */}
      <ul>
        <li>
          <a href="/">
            <img src="/assets/logo.png" alt="Logo" />
          </a>
        </li>

        {/* Desktop nav links */}
        <li className="hideOnMobile">
          <NavLink to="/" className={(navData) => (navData.isActive ? "active-link" : "")}>
            Etusivu
          </NavLink>
        </li>
        <li className="hideOnMobile">
          <NavLink to="/CarParts" className={(navData) => (navData.isActive ? "active-link" : "")}>
            Osat
          </NavLink>
        </li>
        <li className="hideOnMobile">
          <NavLink to="/Services" className={(navData) => (navData.isActive ? "active-link" : "")}>
            Palvelut
          </NavLink>
        </li>
        <li className="hideOnMobile">
          <NavLink to="/Prices" className={(navData) => (navData.isActive ? "active-link" : "")}>
            Hinnasto
          </NavLink>
        </li>
        <li className="hideOnMobile">
          <NavLink to="/Contact" className={(navData) => (navData.isActive ? "active-link" : "")}>
            Yhteistiedot
          </NavLink>
        </li>

        {/* Cart icon (shown on both desktop & mobile) */}
        <li className="cart-icon-wrapper" style={{ position: "relative" }}>
          <button
            onClick={() => setShowCartModal(!showCartModal)}
            aria-haspopup="true"
            aria-expanded={showCartModal}
            className="nav-button-like"
          >
            <i className="fa fa-fw fa-shopping-cart"></i>
            <span>{totalItems}</span>
          </button>

          {showCartModal && (
            <div ref={modalRef} className="cart-modal">
              <h4>Ostoskori</h4>

              {cart.length === 0 ? (
                <p>Ostoskori on tyhjä</p>
              ) : (
                <>
                  <ul className="cart-item-list">
                    {cart.map((item, index) => (
                      <li key={index} className="cart-item">
                        <NavLink to={`/parts/${item.part_number}`} className="item-name-link">
                          <span className="item-name">{item.name}</span>
                        </NavLink>

                        <span className="item-qty-price">
                          {item.quantity} x {item.price}€
                        </span>
                        <button className="delete-btn" onClick={() => removeFromCart(item.part_id)}>
                          <i className="fa fa-trash"></i>
                        </button>
                      </li>
                    ))}
                  </ul>

                  <div className="cart-total">
                    <strong>Yhteensä: {totalPrice.toFixed(2)} €</strong>
                  </div>
                </>
              )}

              <div className="cart-modal-buttons">
                <NavLink to="/ShoppingCart" onClick={() => setShowCartModal(false)}>
                  Näytä ostoskori
                </NavLink>
              </div>
            </div>
          )}
        </li>

        {/* Hamburger menu button - visible only on mobile */}
        <li className="menu-button" onClick={showSidebar}>
          <button type="button" className="menu-button-icon">
            <i className="fa fa-bars" alt="Menu Icon"></i>
          </button>
        </li>
      </ul>
    </nav>
  );
}

