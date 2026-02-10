import React, { useState } from "react";
import Axios from "axios";
import "./admindashboard.css";
import CategoryList from "../../components/CategoryList";

const AdminDashboard = () => {
  const [form, setForm] = useState({
    name: "",
    model: "",
    part_number: "",
    description: "",
    price: "",
    quantity: "",
    category: "",
    images: [],
  });

  const [selectedCategoryPath, setSelectedCategoryPath] = useState(""); // ✅ CategoryNode fix
  const [message, setMessage] = useState("");
  const [deletePartNumber, setDeletePartNumber] = useState("");
  const [deleteName, setDeleteName] = useState("");

  // --- Category select handler ---
  const handleCategorySelect = (categoryName) => {
    setForm((prev) => ({
      ...prev,
      category: categoryName,
    }));
    setSelectedCategoryPath(categoryName); // päivitetään myös valittu path
  };

  // --- Input change handler ---
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "images") {
      setForm({ ...form, images: Array.from(files) });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  // --- Submit new part ---
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

      const response = await Axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/api/parts`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setMessage(response.data.message);
      setForm({
        name: "",
        model: "",
        part_number: "",
        description: "",
        price: "",
        quantity: "",
        category: "",
        images: [],
      });
      setSelectedCategoryPath(""); // reset
    } catch (err) {
      console.error(err);
      setMessage("Error adding part");
    }
  };

  // --- Delete part ---
  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      const response = await Axios.delete(
        `${process.env.REACT_APP_API_BASE_URL}/api/parts/${deletePartNumber}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: deleteName ? { name: deleteName } : {},
        }
      );

      setMessage(response.data.message || "Part deleted successfully");
      setDeletePartNumber("");
      setDeleteName("");
    } catch (err) {
      console.error(err);
      setMessage("Error deleting part");
    }
  };

  return (
    <div className="admin-dashboard">
      <h2 className="dashboard-header">Lisää osa</h2>
      <form className="admin-form" onSubmit={handleSubmit}>
        <label htmlFor="part-name">Nimi</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="..."
          required
        />

        <label htmlFor="model">Malli</label>
        <input
          type="text"
          name="model"
          value={form.model}
          onChange={handleChange}
          placeholder="..."
          required
        />

        <label>Kategoria</label>
        <div className="category-select">
          <CategoryList
            onSelectCategory={handleCategorySelect}
            selectedCategoryPath={selectedCategoryPath}
            setSelectedCategoryPath={setSelectedCategoryPath}
          />
        </div>
        {form.category && (
          <p className="selected-category">
            Valittu kategoria: <strong>{form.category}</strong>
          </p>
        )}

        <label htmlFor="part_number">Varaosanumero</label>
        <input
          type="text"
          name="part_number"
          value={form.part_number}
          onChange={handleChange}
          placeholder="..."
          required
        />

        <label htmlFor="price">Hinta</label>
        <input
          type="number"
          name="price"
          value={form.price}
          onChange={handleChange}
          placeholder="..."
          required
        />

        <label htmlFor="quantity">Määrä</label>
        <input
          type="number"
          name="quantity"
          value={form.quantity}
          onChange={handleChange}
          placeholder="..."
          required
        />

        <label htmlFor="description">Kuvaus</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="..."
          rows="5"
        />

        <input
          className="image-input"
          type="file"
          name="images"
          onChange={handleChange}
          accept="image/*"
          multiple
        />

        {/* Esikatselu valituille kuville */}
        {form.images.length > 0 && (
          <div className="preview">
            {form.images.map((img, i) => (
              <img key={i} src={URL.createObjectURL(img)} alt="" width={80} />
            ))}
          </div>
        )}

        <button type="submit" disabled={!form.category}>
          Lisää osa
        </button>
      </form>
      {message && <p>{message}</p>}

      <h2 className="dashboard-header">Poista osa</h2>
      <form className="admin-form" onSubmit={handleDelete}>
        <label htmlFor="deletePartNumber">Varaosanumero</label>
        <input
          type="text"
          name="deletePartNumber"
          value={deletePartNumber}
          onChange={(e) => setDeletePartNumber(e.target.value)}
          placeholder="..."
          required
        />
        <button type="submit">Poista</button>
      </form>
    </div>
  );
};

export default AdminDashboard;
