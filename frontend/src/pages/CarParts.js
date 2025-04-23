import React, {useState, useEffect} from 'react';
import Axios from 'axios';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import ReactPaginate from "react-paginate"; 
import Banner from "../components/Banner";
import ProductCard from '../components/ProductCard';
import Search from '../components/Search';
import "../styles/CarParts.css";

const CarParts = () => {
    const [parts, setParts] = useState([]);
    const [filteredParts, setFilteredParts] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [partsPerPage] = useState(4);

    useEffect(() => {
      const getData = async () => {
        try {
          const response = await Axios.get("http://localhost:3000/api/parts");
          setParts(response.data);
          setFilteredParts(response.data);
        } catch (error) {
          console.error("Error fetching parts: ", error);
        }
      };

      getData();
    }, []);

    // Update filtered parts based on search query
    const handleSearchResults = (results) => {
      setFilteredParts(results);
      setCurrentPage(0);
    };

    // Page change
    const handlePageClick = (data) => {
      setCurrentPage(data.selected);
    };

    const currentParts = filteredParts.slice(
      currentPage * partsPerPage,
      (currentPage + 1) * partsPerPage
    );
  
    return (
      <div>
        <Banner title="Osat" imageUrl="/assets/banner.JPG">
          {/* Pass the handleSearchResults function to Search component */}
        </Banner>
        <Search onSearchResults={handleSearchResults} />
        
        <div className="carParts-container">
          {currentParts.length > 0 ? (
            currentParts.map((part) => (
              <ProductCard key={part.part_number} part={part} />
            ))
          ) : (
            <p>Osaa ei löytynyt</p>
          )}
        </div>
  
        <div className="pagination-container">
          <ReactPaginate
            previousLabel={<FaArrowLeft />}
            nextLabel={<FaArrowRight />}
            pageCount={Math.ceil(filteredParts.length / partsPerPage)}  
            onPageChange={handlePageClick}  
            containerClassName={"pagination-container"}
            pageClassName={"page-item"}
            pageLinkClassName={"page-link"}
            activeClassName={"active"}
            
            previousClassName={"page-item previous"}  
            nextClassName={"page-item next"}
            previousLinkClassName={"page-link previous"}
            nextLinkClassName={"page-link next"}
          />
        </div>
      </div>
    );
  };

export default CarParts;