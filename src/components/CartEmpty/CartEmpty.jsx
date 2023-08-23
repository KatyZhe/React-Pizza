import React from "react";
import { Link } from "react-router-dom";

import cartEmptyImg from '../../img/empty-cart.png';

export default function CartEmpty() {
  return (
    <div className="cart cart--empty">
      <h2>
        Корзина пустая <span>😕</span>
      </h2>
      <p>
        Вероятней всего, вы ещё не заказывали пиццу.
        <br />
        Чтобы заказать пиццу, перейди на главную страницу.
      </p>
      <img src={cartEmptyImg} alt="Empty cart" />
      <Link to="/" className="button button--black">
        <span>Вернуться назад</span>
      </Link>
    </div>
  );
}
