import React, { useRef, useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import debounce from "lodash.debounce";
import "./Search.scss";

import find from "../../img/search_icon.svg";
import clear from "../../img/close_icon.svg";

import { setSearchValue } from "../../redux/filter/filterSlice";

const Search: React.FC = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const onClickClear = () => {
    dispatch(setSearchValue(""));
    setValue("");
    inputRef.current?.focus();
  };

  const updateSearchValue = useCallback(
    debounce((str: string) => {
      dispatch(setSearchValue(str));
    }, 250),
    []
  );

  const onChangeInput = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setValue(evt.target.value);
    updateSearchValue(evt.target.value);
  };

  return (
    <div className="search">
      <input
        ref={inputRef}
        onChange={onChangeInput}
        value={value}
        className="search__input"
        placeholder="Найти пиццу..."
      />
      <img className="search__search" src={find} alt="Найти пиццу" />
      {value && (
        <img
          className="search__clear"
          src={clear}
          alt="очистить поиск"
          onClick={onClickClear}
        />
      )}
    </div>
  );
};

export default Search;
