import React from "react";
import { connect } from "react-redux";
import CartItem from "../CartItem/CartItem";

const CartList = (props) => {
  const { cartItems } = props.cart;
  return (
    <div>
      <h1>There are a total of {props.cart.cartCount} items in cart!</h1>
      {cartItems.map((item, index) => (
        <CartItem key={index} item={item} />
      ))}
      <h1>Total cost: Rs. {props.cart.totalCost}</h1>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
  };
};

export default connect(mapStateToProps)(CartList);
