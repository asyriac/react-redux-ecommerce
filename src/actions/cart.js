import axios from "axios";
import { ADD_TO_CART, INCREASE_QTY, DECREASE_QTY, REMOVE_ITEM, REMOVE_FROM_CART, GET_TOTAL, GET_CART } from "./actionTypes";

export function addToCart(name, price, rating, id) {
  console.log(name, price, rating);
  return async function (dispatch) {
    const { data } = await axios.post(`http://localhost:4000/cart`, { name, price, rating, qty: 1, productID: id });
    dispatch({
      type: ADD_TO_CART,
      payload: data,
    });
  };
}

export function increaseQty(id, qty, name, price, rating, productID) {
  return async function (dispatch) {
    const { data } = await axios.put(`http://localhost:4000/cart/${id}`, { qty: qty + 1, id, name, price, rating, productID });
    dispatch({
      type: INCREASE_QTY,
      payload: data,
    });
  };
}

export function decreaseQty(id, qty, name, price, rating, productID) {
  return async function (dispatch) {
    const { data } = await axios.put(`http://localhost:4000/cart/${id}`, { qty: qty - 1, id, name, price, rating, productID });
    dispatch({
      type: DECREASE_QTY,
      payload: data,
    });
  };
}

export function removeItem(id) {
  return async function (dispatch) {
    await axios.delete(`http://localhost:4000/cart/${id}`);
    dispatch({
      type: REMOVE_ITEM,
      payload: id,
    });
  };
}

export function removeFromCart(id) {
  return async function (dispatch) {
    await axios.delete(`http://localhost:4000/cart/${id}`);
    dispatch({
      type: REMOVE_FROM_CART,
      payload: id,
    });
  };
}

export function getTotal() {
  return {
    type: GET_TOTAL,
  };
}

export function getCart() {
  return async function (dispatch) {
    const { data } = await axios.get("http://localhost:4000/cart/");
    console.log(data, "fetched");
    dispatch({
      type: GET_CART,
      payload: data,
    });
    dispatch({
      type: GET_TOTAL,
    });
  };
}
