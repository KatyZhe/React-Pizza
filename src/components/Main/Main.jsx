import React, { useEffect, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import qs from "qs";

import {
  setCategoryId,
  setCurrentPage,
  setFilters,
  selectFilter
} from "../../redux/slices/filterSlice";

import Categories from "../Categories/Categories";
import Sort, { sortList } from "../Sort/Sort";
import Skeleton from "../PizzaBlock/Skeleton";
import PizzaBlock from "../PizzaBlock/PizzaBlock";
import Pagination from "../Pagination/Pagination";

import { SearchContext } from "../../App";

const Main = () => {
  const { categoryId, sort, currentPage } = useSelector(selectFilter);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const [isLoading, setIsLoading] = useState(true);
  const [pizzas, setPizzas] = useState([]);

  const onChangeCategory = (id) => {
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

  const fetchPizzas = () => {
    setIsLoading(true);

    const order = sort.sortProperty.includes("-") ? "asc" : "desc";
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const search = searchValue ? `&search=${searchValue}` : "";
    const sortBy = sort.sortProperty.replace("-", "");

    axios
      .get(
        `https://64d275adf8d60b174362151e.mockapi.io/pizzas?&page=${currentPage}&limit=8${category}${search}&sortBy=${sortBy}&order=${order}`
      )
      .then((res) => {
        setPizzas(res.data);
        setIsLoading(false);
      });
  };

  // Если был первый рендер, то запрашиваем пиццы
  useEffect(() => {
    window.scroll(0, 0);
    if (!isSearch.current) {
      fetchPizzas();
    }
    isSearch.current = false;
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  // Если изменили параметры и был первый рендер
  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sort.sortProperty, currentPage]);

  // Если был первый рендер, то проверяем URl-параметры и сохраняем в редуксе
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = sortList.find(
        (obj) => obj.sortProperty === params.sortProperty
      );
      dispatch(
        setFilters({
          ...params,
          sort,
        })
      );
      isSearch.current = true;
    }
  }, []);

  return (
    <>
      <div className="content__top">
        <Categories value={categoryId} onClickCategory={onChangeCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeletons : items}</div>
      <Pagination currentPage={currentPage} onPageChange={onChangePage} />
    </>
  );
};

export default Main;
