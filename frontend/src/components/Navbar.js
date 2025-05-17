import { useState} from "react";
import { NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./Nav.css";

export default function Navbar() {
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const {cart, removeFromCart} = useCart();
    const [showCartModal, setShowCartModal] = useState(false);

    const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

    const showSidebar = () => {
        setSidebarVisible(true);
    };

    // Function to hide the sidebar
    const hideSidebar = () => {
        setSidebarVisible(false);
    };

    return <nav className="nav">
        {/* Navigaatio pienemmillä näytöillä */}
        <div className={`overlay ${sidebarVisible ? "show" : ""}`} onClick={hideSidebar}></div>
        <ul className={`sidebar ${sidebarVisible ? "show" : ""}`}> 
            <li className="menu-button" onClick={hideSidebar}>
                <button type="button" className="menu-button-icon">
                    <i className="fa fa-fw fa-window-close" 
                    alt="Close Icon" 
                    ></i> 
                </button>
                
            </li>
            <li>
                <NavLink
                    to="/ShoppingCart"
                    onClick={hideSidebar}
                    className={(navData) => (navData.isActive ? "active-link" : "")}
                >
                    <i className="fa fa-fw fa-shopping-cart"></i>
                    <span>{totalItems}</span>
                </NavLink>
            </li>
            <li><NavLink to ="/" onClick={hideSidebar} className={(navData) => (navData.isActive ? "active-link" : "")}>Etusivu</NavLink></li>

            <li><NavLink to ="/Services" onClick={hideSidebar} className={(navData) => (navData.isActive ? "active-link" : "")}>Palvelut</NavLink></li>
            <li><NavLink to ="/Prices"  onClick={hideSidebar} className={(navData) => (navData.isActive ? "active-link" : "")}>Hinnasto</NavLink></li>
            <li>
                <NavLink to="/CarParts"  onClick={hideSidebar} className={(navData) => (navData.isActive ? "active-link" : "")}>
                    Osat
                </NavLink>
            </li>
            <li><NavLink to ="/Contact"  onClick={hideSidebar} className={(navData) => (navData.isActive ? "active-link" : "")}>Yhteistiedot</NavLink></li>
            
        </ul>

        <ul>
            <li><a href="/">
                    <img 
                        src="/assets/logo.png"
                        alt ="Logo"
                        width={"100%"}
                        height={"100%"}
                    />
                </a>
            </li>
            <li className="hideOnMobile"><NavLink to ="/" className={(navData) => (navData.isActive ? "active-link" : "")}>Etusivu</NavLink></li>
            <li className="hideOnMobile">
                <NavLink to="/CarParts" className={(navData) => (navData.isActive ? "active-link" : "")}>
                    Osat
                </NavLink>
            </li>
            <li className="hideOnMobile"><NavLink to ="/Services" className={(navData) => (navData.isActive ? "active-link" : "")}>Palvelut</NavLink></li>
            <li className="hideOnMobile"><NavLink to ="/Prices" className={(navData) => (navData.isActive ? "active-link" : "")}>Hinnasto</NavLink></li>
            <li className="hideOnMobile"><NavLink to ="/Contact" className={(navData) => (navData.isActive ? "active-link" : "")}>Yhteistiedot</NavLink></li>
            
            <li className="hideOnMobile cart-icon-wrapper"
                style={{ position: "relative" }}
                onMouseEnter={() => setShowCartModal(true)}
                onMouseLeave={() => setShowCartModal(false)}
            >
            
            {/* SHOPPING CART MODAL*/}
            <NavLink
                to="#"
                onClick={(e) => e.preventDefault()}
                style={{ display: "flex", alignItems: "center" }}
            >
            <i className="fa fa-fw fa-shopping-cart"></i>
            <span>{totalItems}</span>
            </NavLink>

            {showCartModal && (
            <div className="cart-modal">
                <h4>Ostoskori</h4>

                {cart.length === 0 ? (
                <p>Ostoskori on tyhjä</p>
            ) : (
            <>
            <ul className="cart-item-list">
                {cart.map((item, index) => (
                <li key={index} className="cart-item">
                    <NavLink to = {`/parts/${item.part_number}`} className="item-name-link">
                    <span className="item-name">{item.name}</span>
                    </NavLink>
                    
                    <span className="item-qty-price">{item.quantity} x {item.price}€</span>
                    <button
                        className="delete-btn"
                        onClick={() => removeFromCart(item.part_id)}
                        >
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
            <NavLink to="/ShoppingCart">Näytä ostoskori</NavLink>
            <NavLink to="/Checkout">Kassa</NavLink>
            </div>
        </div>
        )}
        </li>
            <li className="menu-button" onClick={showSidebar}>
                <button type="button" className="menu-button-icon">
                    <i className = "fa fa-bars"
                    alt="Menu Icon" 
                    ></i>
                </button>
            </li>
        </ul>

    </nav>

}
