import React, { useEffect, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import { setCategoryId, setCurrentPage } from "../../redux/slices/filterSlice";

import Categories from "../Categories/Categories";
import Sort from "../Sort/Sort";
import Skeleton from "../PizzaBlock/Skeleton";
import PizzaBlock from "../PizzaBlock/PizzaBlock";
import Pagination from "../Pagination/Pagination";

import { SearchContext } from "../../App";

const Main = () => {
  const { categoryId, sortType, currentPage } = useSelector(
    (state) => state.filter
  );
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);
  const [pizzas, setPizzas] = useState([]);

  const onClickCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };

  const { searchValue } = useContext(SearchContext);

  const items = pizzas.map((obj) => <PizzaBlock {...obj} key={obj.id} />);
  const skeletons = [...new Array(6)].map((_, index) => (
    <Skeleton key={index} />
  ));

  const category = categoryId > 0 ? `category=${categoryId}` : "";
  const search = searchValue ? `&search=${searchValue}` : "";

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(
        `https://64d275adf8d60b174362151e.mockapi.io/pizzas?&page=${currentPage}&limit=8${category}${search}&sortBy=${sortType}&order=desc`
      )
      .then((res) => {
        setPizzas(res.data);
        setIsLoading(false);
      });
    window.scroll(0, 0);
  }, [categoryId, sortType, searchValue, currentPage]);

  return (
    <>
      <div className="content__top">
        <Categories value={categoryId} onClickCategory={onClickCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeletons : items}</div>
      <Pagination currentPage={currentPage} onPageChange={onChangePage} />
    </>
  );
};

export default Main;
