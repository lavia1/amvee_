import React, {useState, useEffect} from 'react';
import Axios from 'axios';
import Banner from "../components/Banner";
import ProductCard from '../components/ProductCard';
import "../styles/CarParts.css";

const CarParts = () => {
    const [parts, setParts] = useState([]);

    useEffect(() => {
      const getData = async () => {
        try {
          const response = await Axios.get("http://localhost:3000/api/parts");
          setParts(response.data);
        } catch (error) {
          console.error("Error fetching parts: ", error);
        }
      };

      getData();
    }, [])
  
    return (
      <div>
        <Banner
                title="Osat"
                imageUrl="/assets/banner.JPG"
            />
        <div className="carParts-container">
          {parts.map((part) => (
            <ProductCard key={part.part_number} part={part} />
          ))}
        </div>
      </div>
    );
  };

export default CarParts;