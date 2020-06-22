import axios from "axios";
import { GET_PRODUCTS, DELETE_PRODUCT, EDIT_PRODUCT, CANCEL_EDIT, SAVE_EDIT, ADD_PRODUCT, GET_SINGLE_PRODUCT, GET_TOTAL, SORT } from "./actionTypes";

export function getProducts() {
  return async function (dispatch) {
    const { data } = await axios.get("http://localhost:4000/products");
    dispatch({
      type: GET_PRODUCTS,
      payload: data,
    });
  };
}

export function deleteProduct(productID) {
  return async function (dispatch) {
    await axios.delete(`http://localhost:4000/products/${productID}`);
    dispatch({
      type: DELETE_PRODUCT,
      payload: productID,
    });
  };
}

export function editProduct(productID) {
  return {
    type: EDIT_PRODUCT,
    payload: productID,
  };
}

export function cancelEdit() {
  return {
    type: CANCEL_EDIT,
  };
}

export function saveEdit(id, name, price, rating) {
  console.log(id, name, price, rating);
  return async function (dispatch) {
    await axios.put(`http://localhost:4000/products/${id}`, { name, price, rating });
    dispatch({
      type: SAVE_EDIT,
      payload: {
        editableProductNumber: null,
        id,
        data: {
          name,
          price,
          rating,
        },
      },
    });
    dispatch({
      type: GET_TOTAL,
    });
  };
}

export function addProduct(name, price, rating) {
  return async function (dispatch) {
    const { data } = await axios.post("http://localhost:4000/products/", { name, price, rating });
    dispatch({
      type: ADD_PRODUCT,
      payload: data,
    });
  };
}

export function getSingleProduct(id) {
  return async function (dispatch) {
    try {
      const { data } = await axios.get(`http://localhost:4000/products/${id}`);
      dispatch({
        type: GET_SINGLE_PRODUCT,
        payload: data,
      });
    } catch (err) {
      console.log(err);
    }
  };
}

export function sortProducts() {
  return {
    type: SORT,
  };
}
