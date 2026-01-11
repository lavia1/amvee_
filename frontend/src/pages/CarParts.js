import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import ReactPaginate from "react-paginate"; 
import ProductCard from '../components/ProductCard';
import { useLocation, useNavigate } from 'react-router-dom';  
import { Link } from "react-router-dom";
import "../styles/CarParts.css";
import CategoryList from '../components/CategoryList';
import Search from '../components/Search';

const CarParts = () => {
  const [parts, setParts] = useState([]);
  const [filteredParts, setFilteredParts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [partsPerPage] = useState(12);
  const [selectedCategoryPath, setSelectedCategoryPath] = useState(""); 

  const location = useLocation();  
  const navigate = useNavigate();  

  // --- Hae osat backendistä ---
  const fetchParts = async () => {
    try {
      const response = await Axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/parts`);
      const availableParts = response.data.filter(part => part.stock > 0);
      setParts(availableParts);
      setFilteredParts(availableParts);
    } catch (error) {
      console.error("Error fetching parts: ", error);
    }
  };

  // Fetch osat ensimmäisellä renderöinnillä
  useEffect(() => {
    fetchParts();
  }, []);

  // URL page handling
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const page = queryParams.get("page") || 0; 
    setCurrentPage(Number(page));
  }, [location]);

  // --- Päivitä suodatus hakutulosten mukaan ---
  const handleSearchResults = (results) => {
    const availableParts = results.filter(part => part.stock > 0);
    setFilteredParts(availableParts);
    setCurrentPage(0);
  };

  // --- Päivitä suodatus kategorian mukaan ---
  const handleCategorySelect = (fullPath, isParent) => {
    setSelectedCategoryPath(fullPath);

    let filtered;
    if (isParent) {
      filtered = parts.filter(
        (p) => p.category && p.category.startsWith(fullPath)
      );
    } else {
      filtered = parts.filter(
        (p) => p.category && p.category === fullPath
      );
    }

    setFilteredParts(filtered);
    setCurrentPage(0);
  };

  // --- Selaa sivuja ---
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

  // --- JSX ---
  return (
    <div className="carParts-page">
      <Search onSearchResults={handleSearchResults} />
      <div className="carParts-layout">
        {/* Vasemmanpuoleinen kategoria */}
        <aside className="category-sidebar">
          <CategoryList
            onSelectCategory={handleCategorySelect}
            parts={parts}
            selectedCategoryPath={selectedCategoryPath}
  setSelectedCategoryPath={setSelectedCategoryPath}
          />
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
              <p className="osa" style={{ fontSize: "18px" }}>
                Osia lisätään parhaillaan. Voit ottaa myös{" "}
                <Link className="information-link" to="/Yhteystiedot">
                  yhteyttä
                </Link>
                , jospa osa sittenkin löytyisi :)
              </p>
            )}
          </div>

          {/* Paginaatio */}
          {pageCount > 1 && (
            <ReactPaginate
              previousLabel={<FaArrowLeft />}
              nextLabel={<FaArrowRight />}
              pageCount={pageCount}
              onPageChange={handlePageClick}
              containerClassName={"pagination"}
              activeClassName={"active"}
              pageRangeDisplayed={3}
              marginPagesDisplayed={1}
            />
          )}
        </main>
      </div>
    </div>
  );
};

export default CarParts;
