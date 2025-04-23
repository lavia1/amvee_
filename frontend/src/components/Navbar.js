import { useEffect, useState} from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./Nav.css";

export default function Navbar() {
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const {cart} = useCart();
    const [showCartModal, setShowCartModal] = useState(false);

    const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
    // const [isAdmin, setIsAdmin] = useState(false);
    // const navigate = useNavigate();

     {/*
    useEffect(() => {
        // Check is admin is logged in 
        const token = localStorage.getItem("token");
        setIsAdmin(!token);
    }, []);
   
    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsAdmin(false); 
        navigate("/")
    };
    */}

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
        
            <li><NavLink to="/HomePage" onClick={hideSidebar} className={(navData) => (navData.isActive ? "active-link" : "")}>Etusivu</NavLink></li>
            <li><NavLink to ="/Services" onClick={hideSidebar} className={(navData) => (navData.isActive ? "active-link" : "")}>Palvelut</NavLink></li>
            <li><NavLink to ="/Prices"  onClick={hideSidebar} className={(navData) => (navData.isActive ? "active-link" : "")}>Hinnasto</NavLink></li>
            <li>
                <NavLink to="/CarParts"  onClick={hideSidebar} className={(navData) => (navData.isActive ? "active-link" : "")}>
                    Osat
                </NavLink>
            </li>
            <li><NavLink to ="/Contact"  onClick={hideSidebar} className={(navData) => (navData.isActive ? "active-link" : "")}>Yhteistiedot</NavLink></li>
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


            {/* Admin Login / Logout option 
            {isAdmin ? (
                <>
                    <li><NavLink to="/admin/dashboard">Admin Dashboard</NavLink></li>
                    <li><button onClick={handleLogout} className="logout-btn">Logout</button></li>
                </>
            ) : (
                <li><NavLink to="/admin/login">Admin Login</NavLink></li>
            )}
            */}
        </ul>

        <ul>
            <li><a href="/HomePage">
                    <img 
                        src="/assets/logo.png"
                        alt ="Logo"
                        width={"100%"}
                        height={"100%"}
                    />
                </a>
            </li>
            <li className="hideOnMobile"><NavLink to ="/HomePage" className={(navData) => (navData.isActive ? "active-link" : "")}>Etusivu</NavLink></li>
            <li className="hideOnMobile"><NavLink to ="/Services" className={(navData) => (navData.isActive ? "active-link" : "")}>Palvelut</NavLink></li>
            <li className="hideOnMobile"><NavLink to ="/Prices" className={(navData) => (navData.isActive ? "active-link" : "")}>Hinnasto</NavLink></li>
            <li className="hideOnMobile">
                <NavLink to="/CarParts" className={(navData) => (navData.isActive ? "active-link" : "")}>
                    Osat
                </NavLink>
            </li>
            <li className="hideOnMobile"><NavLink to ="/Contact" className={(navData) => (navData.isActive ? "active-link" : "")}>Yhteistiedot</NavLink></li>
            
            <li className="hideOnMobile cart-icon-wrapper"
                style={{ position: "relative" }}
                onMouseEnter={() => setShowCartModal(true)}
                onMouseLeave={() => setShowCartModal(false)}
            >
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
                    <span className="item-name">{item.name}</span>
                    <span className="item-qty-price">{item.quantity} x {item.price}€</span>
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

    



    


            {/* Show admin options only if logged in 
            {isAdmin ? (
                <>
                    <li className="hideOnMobile"><NavLink to ="admin/dashboard">Admin Dashboard</NavLink></li>
                    <li className="hideOnMobile"><button onClick={handleLogout} className="logout-btn"></button></li>
                </>
            ) : (
                <li className="hideOnMobile"><NavLink to="/admin/login">Admin Login</NavLink></li>
            )}
            */}


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
