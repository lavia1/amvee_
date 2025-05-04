import React, {useState} from "react";
import Axios from 'axios';

const AdminDashboard = () => {
    const [form, setForm] = useState ({
        name: '',
        model: '',
        part_number: '',
        description: '',
        price: '',
        quantity: '',
        category:'',
        images: [] 
    });
    
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value, files} = e.target;
        if (name === "images") {
            setForm({...form, images: Array.from(files) });
        } else {
            setForm({...form, [name]: value});
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        for (const key in form) {
            if (key === "images") {
                form.images.forEach((file) => formData.append("images", file));
            } else {
                formData.append(key, form[key]);
            }
        }

        try {
            const token = localStorage.getItem("token");

            const response = await Axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/parts`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type":"multipart/form-data"
                }
            });

            setMessage(response.data.message);
            setForm({
                name: '',
                model: '',
                part_number: '',
                description: '',
                price: '',
                quantity: '',
                category:'',
                images: []
            });
        } catch (err) {
            console.error(err);
            setMessage("Error adding part");
        }
    };

    return (
        <div className="admin-dashboard">
            <h2>Lisää osa </h2>
            <form onSubmit={handleSubmit} encType ="multipart/form-data">
                <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="nimi" required />
                <input type="text" name="model" value={form.model} onChange={handleChange} placeholder="malli" required />
                <input type="text" name="part_number" value={form.part_number} onChange={handleChange} placeholder="varaosanumero" required />
                <input type="text" name="description" value={form.description} onChange={handleChange} placeholder="kuvaus" required />
                <input type="number" name="price" value={form.price} onChange={handleChange} placeholder="hinta" required />
                <input type="number" name="quantity" value={form.quantity} onChange={handleChange} placeholder="määrä" required />
                <input type="text" name="category" value={form.category} onChange={handleChange} placeholder="kategoria" required />

                <input 
                    type="file" 
                    name="images" 
                    onChange={handleChange} 
                    accept="image/*" 
                    multiple
                    required />

                <button type ="submit">Lisää osa</button>
            </form>
            {message && <p>{message}</p>}

        </div>
    );


};

export default AdminDashboard;