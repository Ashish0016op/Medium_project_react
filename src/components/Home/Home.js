import React, { useContext, useState } from "react";
import Navbar from "../Navbar/Navbar";
import "./Home.css";
import CartContext from "../store/cart-context";

const Home = () => {
  const ctx = useContext(CartContext);
  const [candyName, setCandyName] = useState('');
  const [candyDes, setCandyDes] = useState('');
  const [candyPrice, setCandyPrice] = useState('');
  const [data, setData] = useState([]);

  const handleCandyName = (e) => {
    setCandyName(e.target.value);
  };

  const handleDescription = (e) => {
    setCandyDes(e.target.value);
  };

  const handlePrice = (e) => {
    setCandyPrice(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      id: Math.random().toString(),
      candyName,
      candyDes,
      candyPrice,
    };

    setData((prevData) => [...prevData, formData]);
    setCandyName("");
    setCandyDes("");
    setCandyPrice("");
  };

  const handleBuyBtn = (quantity, item) => {
    const itemToAdd = { ...item, quantity };
    ctx.setCartItem((prevItems) => {
      const existingItemIndex = prevItems.findIndex((i) => i.id === itemToAdd.id);
      if (existingItemIndex >= 0) {
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += quantity;
        return updatedItems;
      }
      return [...prevItems, itemToAdd];
    });
  };

  return (
    <div>
      <Navbar />
      <div className="form_box">
        <form onSubmit={handleSubmit}>
          <label htmlFor="candyName">Candy Name: </label>
          <input
            type="text"
            id="candyName"
            value={candyName}
            onChange={handleCandyName}
          />

          <label htmlFor="des">Description: </label>
          <input
            type="text"
            id="des"
            value={candyDes}
            onChange={handleDescription}
          />

          <label htmlFor="price">Price: </label>
          <input
            type="number"
            id="price"
            value={candyPrice}
            onChange={handlePrice}
          />

          <button type="submit">Add</button>
        </form>
      </div>

      <div className="items_box">
        {data.map((item) => (
          <div className="item_list" key={item.id}>
            <div>
              <p>{item.candyName}</p>
            </div>
            <div>
              <p>{item.candyDes}</p>
            </div>
            <div>
              <p>₹{item.candyPrice}</p>
            </div>
            <div className="buy_btn">
              <button onClick={() => handleBuyBtn(1, item)}>Buy One</button>
              <button onClick={() => handleBuyBtn(2, item)}>Buy Two</button>
              <button onClick={() => handleBuyBtn(3, item)}>Buy Three</button>
            </div>
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
