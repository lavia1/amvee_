import {Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = ({children}) => {
    const token = localStorage.getItem("token");

    if (!token) {
        return <Navigate to ="" />
    }
    try {
        const decoded = jwtDecode(token);
        if (decoded.role !== "admin") {
            return <Navigate to="/admin/login/456759" />
        }

        const now = Date.now() / 1000;
        if (decoded.exp && decoded.exp < now) {
            localStorage.removeItem("token");
            return <Navigate to ="/admin/login/456759" />
        }

        return children;
    } catch (err) {
        localStorage.removeItem("token");
        return <Navigate to = "/admin/login/456759" />
    }
};

export default ProtectedRoute;