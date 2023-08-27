import "./Categories.scss";
import { useSelector } from "react-redux";

const Categories = ({ onClickCategory }) => {
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
            className={status === i ? "active" : ""}
          >
            {categorieName}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
