import React, { Component } from "react";
import { connect } from "react-redux";
import { addProduct } from "../../actions/products";
import "./AddProduct.css";

import { toast } from "react-toastify";

class AddProduct extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      price: "",
      rating: "",
    };
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleAddProduct = (e) => {
    e.preventDefault();
    const { name, price, rating } = this.state;
    this.props.dispatch(this.props.addProduct(name, price, rating));
    this.setState({
      name: "",
      price: "",
      rating: "",
    });
    toast.success("Product added", {
      position: toast.POSITION.TOP_LEFT,
    });
  };

  render() {
    return (
      <div>
        <h1>Add Product</h1>
        <form>
          <input className="input-box" type="input" name="name" placeholder="Enter product name" value={this.state.name} onChange={this.handleChange} autoComplete="off" /> <br />
          <input className="input-box" type="input" name="price" placeholder="Enter product price" value={this.state.price} onChange={this.handleChange} autoComplete="off" /> <br />
          <input className="input-box" type="input" name="rating" placeholder="Enter product rating" value={this.state.rating} onChange={this.handleChange} autoComplete="off" /> <br />
          <button className="btn-add" onClick={this.handleAddProduct}>
            Add product
          </button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    addProduct,
  };
};

export default connect(null, mapDispatchToProps)(AddProduct);
