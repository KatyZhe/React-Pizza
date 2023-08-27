import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function FullPizza() {
  const [pizza, setPizza] = React.useState();
  const { id } = useParams();
  const navigate = useNavigate();
  React.useEffect(() => {
    async function fechPizza() {
      try {
        const { data } = await axios.get(
          "https://64d275adf8d60b174362151e.mockapi.io/items/" + id
        );
        setPizza(data);
      } catch (error) {
        alert(error.message);
        navigate("/");
      }
    }
    fechPizza();
  }, []);
  if (!pizza) {
    return "Loading...";
  }
  return (
    <div>
      <h1>FullPizza</h1>
      <h2>{pizza.title}</h2>
    </div>
  );
}
