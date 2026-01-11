import React, { useState } from "react";
import { categories } from "./categories";
import CategoryNode from "./CategoryNode";
import "./categorylist.css";

export default function CategoryList({ onSelectCategory, parts }) {
  const [openCategory, setOpenCategory] = useState(null);

  return (
    <div className="category-container">
      <ul className="category-root">
        {categories.map((cat) => (
          <CategoryNode
            key={cat.name}
            node={cat}
            onSelect={onSelectCategory}
            isOpen={openCategory === cat.name}
            onToggle={() =>
              setOpenCategory((prev) => (prev === cat.name ? null : cat.name))
            }
            parts={parts} // Lähetetään osat myös CategoryNodeen
          />
        ))}
      </ul>
    </div>
  );
}
