import React, {useState, useEffect, useRef} from "react";
import './dropdown.css';

const Dropdown = ({parts, onFilter}) => {
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedModel, setSelectedModel] = useState('');

    const [isCategoryOpen, setIsCategoryOpen] = useState(false);
    const [isModelOpen, setIsModelOpen] = useState(false);

    const dropdownRef = useRef(null);


    const categories = [...new Set(parts.map(p => p.category))];
    const models = [...new Set(parts 
        .filter(p => !selectedCategory || p.category === selectedCategory)
        .map(p => p.model)
    )];

    // Filters parts based on selected category and model
    const handleFilter = () => {
        const filtered = parts.filter(p => {
            return (!selectedCategory || p.category === selectedCategory) &&
                   (!selectedModel || p.model === selectedModel);
        });
        onFilter(filtered);
    };

    useEffect(() => {
        handleFilter(); 
    }, [selectedCategory, selectedModel]);

    // Handle category selection and close the dropdown
    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
        setIsCategoryOpen(false); 
    };

    // Handle model selection and close the dropdown
    const handleModelSelect = (model) => {
        setSelectedModel(model);
        setIsModelOpen(false); 
    };

    // Clicks outside the dropdown
    useEffect(() => {
      const handleClickOutside =(event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
          setIsCategoryOpen(false);
          setIsModelOpen(false);
        }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="filter-dropdown" ref={dropdownRef}>
          {/* CATEGORY DROPDOWN */}
          <div className="category-section">
            <button 
              className="dropdown-toggle" 
              onClick={() => {
                setIsCategoryOpen(prev => !prev);
                setIsModelOpen(false);
              }}
            >
              Kategoria 
            </button>
            {isCategoryOpen && (
              <div className="dropdown-content">
                {categories.map((category, idx) => (
                  <label key={idx}>
                    <input 
                      type="radio"
                      name="category"
                      value={category}
                      checked={selectedCategory === category}
                      onChange={() => handleCategorySelect(category)}
                    />
                    {category}
                  </label>
                ))}
                <label>
                  <input 
                    type="radio"
                    name="category"
                    checked={selectedCategory === ''}
                    onChange={() => handleCategorySelect('')}
                  />
                  Kaikki
                </label>
              </div>
            )}
          </div>
    
          {/* MODEL DROPDOWN */}
          <div className="model-section">
            <button 
              className="dropdown-toggle" 
              onClick={() => {
                setIsModelOpen(prev => !prev);
                setIsCategoryOpen(false);
              }}
            >
              Malli 
            </button>
            {isModelOpen && (
              <div className="dropdown-content">
                {models.map((model, idx) => (
                  <label key={idx}>
                    <input 
                      type="radio"
                      name="model"
                      value={model}
                      checked={selectedModel === model}
                      onChange={() => handleModelSelect(model)}
                    />
                    {model}
                  </label>
                ))}
                <label>
                  <input 
                    type="radio"
                    name="model"
                    value=""
                    checked={selectedModel === ''}
                    onChange={() => handleModelSelect('')}
                  />
                  Kaikki
                </label>
              </div>
            )}
          </div>
        </div>
      );
    };

export default Dropdown; 