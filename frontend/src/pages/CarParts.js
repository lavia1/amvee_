import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import ReactPaginate from "react-paginate"; 
import Banner from "../components/Banner";
import ProductCard from '../components/ProductCard';
import Search from '../components/Search';
import Dropdown from '../components/Dropdown';
import { useLocation, useNavigate } from 'react-router-dom';  
import "../styles/CarParts.css";

const CarParts = () => {
  const [parts, setParts] = useState([]);
  const [filteredParts, setFilteredParts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [partsPerPage] = useState(12);

  const location = useLocation();  
  const navigate = useNavigate();  

  // Fetch parts from the API
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await Axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/parts`);
        const availableParts = response.data.filter(part => part.stock > 0);
        setParts(availableParts);
        setFilteredParts(availableParts);
      } catch (error) {
        console.error("Error fetching parts: ", error);
      }
    };

    getData();
  }, []);

  // Checking the current url and page
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const page = queryParams.get("page") || 0; 
    setCurrentPage(Number(page));
  }, [location]);  

  const handleSearchResults = (results) => {
    const availableParts = results.filter(part => part.stock > 0);
    setFilteredParts(availableParts);
    setCurrentPage(0);  
  };

  const handlePageClick = (data) => {
    const selectedPage = data.selected;
    
    // Ensure that the selected page is within bounds
    if (selectedPage < Math.ceil(filteredParts.length / partsPerPage)) {
      setCurrentPage(selectedPage);
      // Update the URL with the new page number
      navigate(`?page=${selectedPage}`);
    }
  };

  // Get the parts for the current page
  const currentParts = filteredParts.slice(
    currentPage * partsPerPage,
    (currentPage + 1) * partsPerPage
  );

  const pageCount = Math.ceil(filteredParts.length / partsPerPage);

  return (
    <div>
      <Banner title="Osat" imageUrl="/assets/bmw_logo_banner.jpg">
      </Banner>
      <div className="filters-bar">
        <Search onSearchResults={handleSearchResults} />
        <Dropdown parts={parts} onFilter={handleSearchResults} />
      </div>
      
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
          pageCount={pageCount}  // Safe page count
          onPageChange={handlePageClick}  
          containerClassName={"pagination-container"}
          pageClassName={"page-item"}
          pageLinkClassName={"page-link"}
          activeClassName={"active"}  
          forcePage={currentPage}  // Ensure the page index is within bounds
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
