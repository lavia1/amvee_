import { useState} from "react";
import "./Nav.css";

export default function Navbar() {
    const [sidebarVisible, setSidebarVisible] = useState(false);

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
                <a href="/HomePage">
                    <img src="/assets/close_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.svg" 
                    alt="Close Icon" 
                    viewBox="0 96 960 960" 
                    width="26" 
                    height="26" />
                </a>
            </li>
            <li><a href="/HomePage" >Etusivu</a></li>
            <li><a href="/Services" >Palvelut</a></li>
            <li><a href="/Prices" >Hinnasto</a></li>
            <li><a href="/CarParts" >Osat</a></li>
            <li><a href="/Contact" >Yhteistiedot</a></li>
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
            <li className="hideOnMobile"><a href ="/HomePage">Etusivu</a></li>
            <li className="hideOnMobile"><a href ="/Services">Palvelut</a></li>
            <li className="hideOnMobile"><a href ="/Prices">Hinnasto</a></li>
            <li className="hideOnMobile"><a href ="/CarParts">Osat</a></li>
            <li className="hideOnMobile"><a href ="/Contact">Yhteistiedot</a></li>
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
