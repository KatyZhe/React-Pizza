import React from "react";

import pizzas from "../../assets/pizzas.json";
import { useState } from "react";

import Categories from '../Categories/Categories';
import Sort from '../Sort/Sort';
import Skeleton from '../PizzaBlock/Skeleton';
import PizzaBlock from '../PizzaBlock/PizzaBlock';

const Main = () => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <>
      <div className="content__top">
        <Categories />
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