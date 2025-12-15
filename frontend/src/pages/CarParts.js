import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import ReactPaginate from "react-paginate"; 
import ProductCard from '../components/ProductCard';
import { useLocation, useNavigate } from 'react-router-dom';  
import "../styles/CarParts.css";
import CategoryList from '../components/CategoryList';

const CarParts = () => {
  const [parts, setParts] = useState([]);
  const [filteredParts, setFilteredParts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [partsPerPage] = useState(12);
  const [selectedCategoryPath, setSelectedCategoryPath] = useState(""); 

  const location = useLocation();  
  const navigate = useNavigate();  

  // Fetch parts
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

  // URL page handling
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

  const handleCategorySelect = (fullPath, isParent) => {
    setSelectedCategoryPath(fullPath);
    let filtered;
    if (isParent) {
      // Pääkategoria: kaikki osat, joiden category alkaa pääkategorian nimellä
      filtered = parts.filter(p => p.category.startsWith(fullPath));
    } else {
      // Alakategoria: vain tarkka alikategoria
      filtered = parts.filter(p => p.category === fullPath);
    }
    setFilteredParts(filtered);
    setCurrentPage(0);
  };

  const handlePageClick = (data) => {
    const selectedPage = data.selected;
    if (selectedPage < Math.ceil(filteredParts.length / partsPerPage)) {
      setCurrentPage(selectedPage);
      navigate(`?page=${selectedPage}`);
    }
  };

  const currentParts = filteredParts.slice(
    currentPage * partsPerPage,
    (currentPage + 1) * partsPerPage
  );

  const pageCount = Math.ceil(filteredParts.length / partsPerPage);

  return (
    <div className="carParts-page">

      <div className="carParts-layout">
        {/* Vasemmanpuoleinen kategoria */}
        <aside className="category-sidebar">
          <CategoryList onSelectCategory={handleCategorySelect} />
        </aside>

        {/* Oikeanpuoleinen osat */}
        <main className="parts-main">
          {selectedCategoryPath && (
            <div className="selected-category-path">
              <strong>{selectedCategoryPath}</strong>
            </div>
          )}

          <div className="carParts-container">
            {currentParts.length > 0 ? (
              currentParts.map((part) => (
                <ProductCard key={part.part_number} part={part} />
              ))
            ) : (
              <p>Osaa ei ole valikoimassa</p>
            )}
          </div>

          
        </main>
      </div>
    </div>
  );
};

export default CarParts;
