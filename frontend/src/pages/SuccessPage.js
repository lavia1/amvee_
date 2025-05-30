import {useEffect} from 'react';
import { useCart } from '../context/CartContext';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../styles/SuccessPage.css"; 

const SuccessPage = () => {
    const {clearCart} = useCart();
    const navigate = useNavigate();

    useEffect(() => {
        const sessionId = new URLSearchParams(window.location.search).get("session_id");

        if (sessionId) {
            Axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/verify-session`, {sessionId})
            .then((response) => {
                if (response.status === 200) {
                    clearCart(); 
                    setTimeout(() => {
                        navigate('/');
                    }, 4000);
                } else {
                    console.warn("Session verification did not return success status");
                }
            })
            .catch((err) => {
                console.error("Session verification failed",err);
            });
        }
    }, [clearCart, navigate])

    return (
        <div className="success-container">
            <h1 className="success-header">Kiitos tilauksestasi</h1>
            <p>Tilauksesi on vahvistettu. </p>
        </div>
    );
};
export default SuccessPage;
