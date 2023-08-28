import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const FullPizza: React.FC = () => {
  const [pizza, setPizza] = React.useState<{imageURL: string, title: string, price: number}>();
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
    return <>"Loading..."</>;
  }
  return (
    <div>
      <img src={pizza.imageURL} alt="картинка с пиццей" />
      <h2>{pizza.title}</h2>
      <h4>{pizza.price}</h4>
    </div>
  );
}

export default FullPizza;
