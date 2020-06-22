import React from "react";
import "./CartItem.css";

const CartItem = (props) => {
  const { item } = props;
  return (
    <div className="cart-item">
      <h1>Product name: {item.name}</h1>
      <h1>Price: Rs. {item.price}</h1>
      <h1>Quantity: x{item.qty}</h1>
    </div>
  );
};

export default CartItem;
