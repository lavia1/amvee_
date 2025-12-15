import React, { useState } from "react";

function CategoryNode({ node, onSelect, parentPath = "", isOpen: controlledIsOpen, onToggle }) {
  const [openChild, setOpenChild] = useState(null);
  const hasChildren = node.children && node.children.length > 0;

  const fullPath = parentPath ? `${parentPath}/${node.name}` : node.name;

  // Päätason isOpen
  const isOpen = controlledIsOpen ?? false;

  // Klikki pääkategoriaan tai alikategoriaan
  const handleClick = () => {
    if (hasChildren) {
      onToggle?.();
      onSelect?.(fullPath, true); // pääkategoria
    } else {
      onSelect?.(fullPath, false); // alikategoria
    }
  };

  // Toggle lapsille (vain yksi lapsi auki kerrallaan)
  const handleToggleChild = (childName) => {
    setOpenChild((prev) => (prev === childName ? null : childName));
  };

  return (
    <li className="category-item">
      <span
        className={`category-span ${hasChildren ? "has-children" : ""}`}
        onClick={handleClick}
      >
        {node.name}
        {hasChildren && <span>{isOpen ? "▼" : "▶"}</span>}
      </span>

      {hasChildren && isOpen && (
        <ul className="subcategory-list">
          {node.children.map((child) => (
            <CategoryNode
              key={`${fullPath}/${child.name}`}
              node={child}
              onSelect={onSelect}
              parentPath={fullPath}
              isOpen={openChild === child.name}
              onToggle={() => handleToggleChild(child.name)}
            />
          ))}
        </ul>
      )}
    </li>
  );
}

export default CategoryNode;

