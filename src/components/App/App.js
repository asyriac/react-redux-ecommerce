import React from "react";
import "./App.css";
import ProductsList from "../ProductsList/ProductsList";
import { Switch, Route, Redirect } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import AddProduct from "../AddProduct/AddProduct";
import ProductInfo from "../ProductInfo/ProductInfo";
import CartList from "../CartList/CartList";
import { connect } from "react-redux";
import { getCart } from "../../actions/cart";
import { getProducts } from "../../actions/products";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(this.props.getCart());
    this.props.dispatch(this.props.getProducts());
  }
  render() {
    return (
      <>
        <Navbar />
        <div className="App">
          <Switch>
            <Route path="/home" exact component={ProductsList} />
            <Route path="/add-product" exact component={AddProduct} />
            <Route path="/product/:id" exact component={ProductInfo} />
            <Route path="/cart" exact component={CartList} />
            <Redirect from="/" exact to="/home" />
          </Switch>
          <ToastContainer />
        </div>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    getCart,
    getProducts,
  };
};

export default connect(null, mapDispatchToProps)(App);
