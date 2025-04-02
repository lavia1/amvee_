import React, {useState, useEffect} from 'react';
import Axios from 'axios';
import Navbar from '../components/Navbar';

const CarParts = () => {
    const [data, setData] = useState("");
  
    const getData = async () => {
      try {
        const response = await Axios.get("http://localhost:3000/api/parts");
        setData(JSON.stringify(response.data, null, 2)); // Convert JSON to a readable string
      } catch (error) {
        console.error("Error fetching data:", error);
        setData("Error loading data");
      }
    };
  
    useEffect(() => {
      getData();
    }, []);
  
    return (
      <div>
        <h1>Car Parts (Raw JSON)</h1>
        <pre>{data}</pre> {/* Displays JSON in a formatted way */}
      </div>
    );
  };

export default CarParts;