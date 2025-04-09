import { useEffect, useState} from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Nav.css";

export default function Navbar() {
    const [sidebarVisible, setSidebarVisible] = useState(false);
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
        <ul className={`sidebar ${sidebarVisible ? "show" : ""}`}> 
            <li onClick={hideSidebar}>
                <a href="#">
                    <img src="/assets/close_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.svg" 
                    alt="Close Icon" 
                    viewBox="0 96 960 960" 
                    width="26" 
                    height="26" />
                </a>
            </li>
            <li><NavLink to ="/HomePage" className={(navData) => (navData.isActive ? "active-link" : "")}>Etusivu</NavLink></li>
            <li><NavLink to ="/Services" className={(navData) => (navData.isActive ? "active-link" : "")}>Palvelut</NavLink></li>
            <li><NavLink to ="/Prices" className={(navData) => (navData.isActive ? "active-link" : "")}>Hinnasto</NavLink></li>
            <li>
                <NavLink to="/CarParts" className={(navData) => (navData.isActive ? "active-link" : "")}>
                    Osat
                </NavLink>
            </li>
            <li><NavLink to ="/Contact" className={(navData) => (navData.isActive ? "active-link" : "")}>Yhteistiedot</NavLink></li>

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
                <a href="#">
                    <img src = "/assets/menu_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.svg"
                    alt="Menu Icon" 
                    viewBox="0 96 960 960" 
                    width="26" 
                    height="26" 
                    />
                </a>
            </li>
        </ul>

    </nav>

}
