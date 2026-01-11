import React, { useState } from "react";

function CategoryNode({
  node,
  onSelect,
  parentPath = "",
  isOpen: controlledIsOpen,
  onToggle,
  parts,
  selectedCategoryPath,
  setSelectedCategoryPath,
}) {
  const [openChild, setOpenChild] = useState(null);
  const hasChildren = node.children && node.children.length > 0;

  const fullPath = parentPath ? `${parentPath}/${node.name}` : node.name;
  const isOpen = controlledIsOpen ?? false;

  // Osien määrä
  const count = parts
    ? parts.filter((p) => p.category && p.category.startsWith(fullPath)).length
    : 0;

  const handleClick = () => {
    if (hasChildren) {
      onToggle?.();
      onSelect?.(fullPath, true);
    } else {
      onSelect?.(fullPath, false);
    }
    setSelectedCategoryPath(fullPath); // asetetaan valittu
  };

  const handleToggleChild = (childName) => {
    setOpenChild((prev) => (prev === childName ? null : childName));
  };

  // Tyylit valitulle
  const spanClass = `category-span ${hasChildren ? "has-children" : ""} ${selectedCategoryPath === fullPath ? "selected" : ""}`;

  return (
    <li className="category-item">
      <span className={spanClass} onClick={handleClick}>
        {node.name} ({count})
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
              parts={parts}
              selectedCategoryPath={selectedCategoryPath}
              setSelectedCategoryPath={setSelectedCategoryPath}
            />
          ))}
        </ul>
      )}
    </li>
  );
}

export default CategoryNode;
