import React, { useContext, useRef, useCallback } from "react";
import debounce from "lodash.debounce";
import "./Search.scss";

import { SearchContext } from "../../App";

import find from "../../img/search_icon.svg";
import clear from "../../img/close_icon.svg";
import { useState } from "react";

const Search = () => {
  const [value, setValue] = useState("");
  const { searchValue, setSearchValue } = useContext(SearchContext);
  const inputRef = useRef();

  const onClickClear = () => {
    setSearchValue("");
    setValue('');
    inputRef.current.focus();
  };

  const updateSearchValue = useCallback(
    debounce((str) => {
      setSearchValue(str);
    }, 1000),
    []
  );

  const onChangeInput = (evt) => {
    setValue(evt.target.value);
    updateSearchValue(evt.target.value);
  }

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
