import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import {
  setCategoryId,
  setCurrentPage,
} from "../../redux/filter/filterSlice";
import { fetchPizzas } from "../../redux/pizza/asyncActions";
import { selectPizzaData } from "../../redux/pizza/selectors";
import { selectFilter } from "../../redux/filter/selectors";
import { useAppDispatch } from "../../redux/store";

import Categories from "../Categories/Categories";
import { Sort } from "../Sort/Sort";
import Skeleton from "../PizzaBlock/Skeleton";
import PizzaBlock from "../PizzaBlock/PizzaBlock";
import Pagination from "../Pagination/Pagination";

const Main: React.FC = () => {
  const { items, status } = useSelector(selectPizzaData);
  const { categoryId, sort, currentPage, searchValue } =
    useSelector(selectFilter);

  const dispatch = useAppDispatch();

  const onChangeCategory = (idx: number) => {
    dispatch(setCategoryId(idx));
  };

  const onChangePage = (number: number) => {
    dispatch(setCurrentPage(number));
  };

  const pizzas = items.map((obj: any) => (
    <Link key={obj.id} to={`/pizza/${obj.id}`}>
      <PizzaBlock {...obj} />
    </Link>
  ));
  const skeletons = [...new Array(6)].map((_, index) => (
    <Skeleton key={index} />
  ));

  const getPizzas = async () => {
    const order = sort.sortProperty.includes("-") ? "asc" : "desc";
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const search = searchValue ? `&search=${searchValue}` : "";
    const sortBy = sort.sortProperty.replace("-", "");

    dispatch(
      fetchPizzas({
        sortBy,
        order,
        category,
        search,
        currentPage: String(currentPage),
      })
    );
    window.scrollTo(0, 0);
  };

  // Если изменили параметры и был первый рендер
  useEffect(() => {
    getPizzas();
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  return (
    <>
      <div className="content__top">
        <Categories value={categoryId} onClickCategory={onChangeCategory} />
        <Sort value={sort} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === "error" ? (
        <div>
          <p>Ошибка 😕</p>
        </div>
      ) : (
        <div className="content__items">
          {status === "loading" ? skeletons : pizzas}
        </div>
      )}
      <Pagination currentPage={currentPage} onPageChange={onChangePage} />
    </>
  );
};

export default Main;
