import React from "react";
import { connect } from "react-redux";
import { deleteProduct, editProduct, cancelEdit, saveEdit } from "../../actions/products";

import "./ProductItem.css";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { toast } from "react-toastify";

class ProductItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.product.name,
      price: this.props.product.price,
      rating: this.props.product.rating,
    };
  }

  handleDelete = (id, props) => {
    props.dispatch(props.deleteProduct(id));
    toast.success("Product deleted", {
      position: toast.POSITION.TOP_LEFT,
    });
  };

  handleEdit = (id, props) => {
    props.dispatch(props.editProduct(id));
  };

  handleCancelEdit = (e) => {
    e.preventDefault();
    this.props.dispatch(this.props.cancelEdit());
    this.setState({
      name: this.props.product.name,
      price: this.props.product.price,
      rating: this.props.product.rating,
    });
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSaveEdit = (e) => {
    e.preventDefault();
    const { name, price, rating } = this.state;
    this.props.dispatch(this.props.saveEdit(this.props.product.id, name, price, rating));
    toast.success("Product updated", {
      position: toast.POSITION.TOP_LEFT,
    });
  };

  render() {
    const { editableProductNumber } = this.props;
    let isEditable = editableProductNumber === this.props.product.id;
    return (
      <div className="item-container">
        <form className={isEditable ? "item" : "optional"}>
          <div className="form_input">
            Product name <input className="input-box" type="text" name="name" value={this.state.name} onChange={this.handleChange} autoComplete="off" /> <br />
            Price <input className="input-box" type="text" name="price" value={this.state.price} onChange={this.handleChange} autoComplete="off" /> <br />
            Rating <input className="input-box" type="text" name="rating" value={this.state.rating} onChange={this.handleChange} autoComplete="off" /> <br />
          </div>
          <div>
            <button className="btn" onClick={this.handleSaveEdit}>
              <FontAwesomeIcon icon="save" />
            </button>
            <button className="btn" onClick={this.handleCancelEdit}>
              <FontAwesomeIcon icon="times-circle" />
            </button>
          </div>
        </form>
        <div className={isEditable ? "optional" : "item"}>
          <div>
            <h1>Product name : {this.props.product.name}</h1>
            <h2>Price: Rs. {this.props.product.price}</h2>
            <h2>Rating: {this.props.product.rating}</h2>
          </div>
          <div>
            <button className="btn" onClick={() => this.handleEdit(this.props.product.id, this.props)}>
              <FontAwesomeIcon icon="pencil-alt" />
            </button>
            <button className="btn" onClick={() => this.handleDelete(this.props.product.id, this.props)}>
              <FontAwesomeIcon icon="trash" />
            </button>
            <Link to={`/product/${this.props.product.id}`}>
              <button className="btn">
                <FontAwesomeIcon icon="info-circle" />
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    editableProductNumber: state.products.editableProductNumber,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    deleteProduct,
    editProduct,
    cancelEdit,
    saveEdit,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductItem);
