import React, { useEffect, useState } from "react";

import Categories from "../Categories/Categories";
import Sort from "../Sort/Sort";
import Skeleton from "../PizzaBlock/Skeleton";
import PizzaBlock from "../PizzaBlock/PizzaBlock";

const Main = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [pizzas, setPizzas] = useState([]);
  const [categorieId, setCategorieId] = useState(0);
  const [sortType, setSortType] = useState(0);

  useEffect(() => {
    setIsLoading(true);
    fetch("https://64d275adf8d60b174362151e.mockapi.io/pizzas?category=" + categorieId)
      .then((res) => {
        return res.json();
      })
      .then((arr) => {
        setPizzas(arr);
        setIsLoading(false);
      });
    window.scroll(0, 0);
  }, [categorieId]);

  return (
    <>
      <div className="content__top">
        <Categories
          value={categorieId}
          onClickCategory={(i) => setCategorieId(i)}
        />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
          : pizzas.map((obj) => <PizzaBlock {...obj} key={obj.id} />)}
      </div>
    </>
  );
};

export default Main;
