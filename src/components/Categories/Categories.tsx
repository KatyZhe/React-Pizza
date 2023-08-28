import React from "react";
import "./Categories.scss";
import { useSelector } from "react-redux";

type CategoriesProps = {
  value: number;
  onClickCategory: (idx: number) => void;
};

const Categories: React.FC<CategoriesProps> = ({ value, onClickCategory }) => {
  const { status } = useSelector((state) => state.pizza);
  const categories = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
  ];

  return (
    <div className="categories">
      <ul>
        {categories.map((categorieName, i) => (
          <li
            key={i}
            onClick={() => onClickCategory(i)}
            className={value === i ? "active" : ""}
          >
            {categorieName}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
