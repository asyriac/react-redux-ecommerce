import React, { Component } from "react";
import { connect } from "react-redux";
import { getProducts, sortProducts } from "../../actions/products";
import { getTotal } from "../../actions/cart";
import ProductItem from "../ProductItem/ProductItem";
import "./ProductList.css";

class Products extends Component {
  handleSort = () => {
    this.props.dispatch(this.props.sortProducts());
    console.log(this.props.productList);
  };
  render() {
    const { showSortedProducts } = this.props;

    console.log(this.props.productList);
    const { productList, sortedProductList } = this.props;
    return (
      <div>
        <button className="btn-sort" onClick={this.handleSort}>
          Sort {showSortedProducts && <span>x</span>}
        </button>
        {showSortedProducts ? sortedProductList.map((product, index) => <ProductItem key={index} product={product} />) : productList.map((product, index) => <ProductItem key={index} product={product} />)}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    productList: state.products.productList,
    sortedProductList: state.products.sortedProductList,
    showSortedProducts: state.products.showSortedProducts,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    getProducts,
    getTotal,
    sortProducts,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Products);
