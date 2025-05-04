import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";

const AdminLogin = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await Axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/auth/login`, {
                username, 
                password
            });

            setSuccess("Login successful");

            localStorage.setItem("token", response.data.token);
            navigate("/admin/dashboard");
        } catch (err) {
            setError("Invalid credentials");
        }
    };

    return (
        <div>
            <h1>Admin Login</h1>
            <form onSubmit={handleLogin}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input 
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Login</button>
            </form>
            {error && <p>{error}</p>}
            {success && <p>{success}</p>}
        </div>
    );
};

export default AdminLogin;