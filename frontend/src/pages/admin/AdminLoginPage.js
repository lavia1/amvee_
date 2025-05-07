import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import "./adminlogin.css";

const AdminLogin = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [failedAttempts, setFailedAttempts] = useState("");
    const [lockoutTime, setLockoutTime] = useState(null);
    const navigate = useNavigate();

    const maxAttempts = 5;
    const lockoutDuration = 60 * 1000;

    useEffect(() => {
        if (lockoutTime && Date.now() < lockoutTime) {
            setError(`Liian monta yritystä. Yritä uudelleen ${Math.ceil((lockoutTime - Date.now()) / 1000)} sekunnin päästä`);
        } else {
            setFailedAttempts(0);
            setLockoutTime(null);
            setError("");
        }
    }, [lockoutTime]);

    const handleLogin = async (e) => {
        e.preventDefault();

        if (lockoutTime && Date.now() < lockoutTime) {
            return;
        }

        try {
            const response = await Axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/auth/login`, {
                username, 
                password
            });

            setSuccess("Kirjautuminen onnistui");

            localStorage.setItem("token", response.data.token);
            navigate("/admin/dashboard");
        } catch (err) {
            setError("Väärät tunnukset");

            setFailedAttempts(prev => prev + 1);
            if (failedAttempts + 1 >= maxAttempts) {
                setLockoutTime(Date.now() + lockoutDuration);
                setError("Liian monta yritystä. Yritä uudelleen yhden minuutin kuluttua.")
            }
        }
    };

    return (
        <div>
            <h1 className="admin-header">Kirjaudu</h1>
            <form className="login-form" onSubmit={handleLogin}>
                <input
                    type="text"
                    placeholder="Käyttäjänimi"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input 
                    type="password"
                    placeholder="Salasana"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Kirjaudu sisään</button>
            </form>
            {error && <p>{error}</p>}
            {success && <p>{success}</p>}
        </div>
    );
};

export default AdminLogin;