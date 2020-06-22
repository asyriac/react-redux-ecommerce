import React from "react";
import { connect } from "react-redux";
import { getSingleProduct } from "../../actions/products";
import { addToCart, increaseQty, decreaseQty, removeItem, removeFromCart, getTotal } from "../../actions/cart";
import "./ProductInfo.css";

import { toast } from "react-toastify";

class ProductInfo extends React.Component {
  componentDidMount() {
    const productID = this.props.match.params.id;
    this.props.dispatch(this.props.getSingleProduct(productID));
  }

  componentDidUpdate() {
    console.log("Updated");
    this.props.dispatch(this.props.getTotal());
  }

  handleAddToCart = () => {
    const { id, name, price, rating } = this.props.product;
    this.props.dispatch(this.props.addToCart(name, price, rating, id));
    toast.success("Added to cart", {
      position: toast.POSITION.TOP_LEFT,
    });
  };

  handleInceaseQty = (id, qty, name, price, rating, productID) => {
    this.props.dispatch(this.props.increaseQty(id, qty, name, price, rating, productID));
  };

  handleDecreaseQty = (id, qty, name, price, rating, productID) => {
    if (qty === 1) {
      this.props.dispatch(this.props.removeItem(id));
      toast.error("Product removed from cart", {
        position: toast.POSITION.TOP_LEFT,
      });
    } else {
      this.props.dispatch(this.props.decreaseQty(id, qty, name, price, rating, productID));
    }
  };

  handleRemoveFromCart = (id) => {
    this.props.dispatch(this.props.removeFromCart(id));
    toast.error("Product removed from cart", {
      position: toast.POSITION.TOP_LEFT,
    });
  };

  render() {
    console.log(this.props.cartItems);
    const { product } = this.props;
    const loading = product === null;
    let isPresentInCart;
    if (loading === false) isPresentInCart = this.props.cartItems.find((item) => item.productID === product.id);
    console.log(isPresentInCart);
    return (
      <div>
        {loading ? (
          <h1>Loading...</h1>
        ) : (
          <>
            <h1>Product name: {product.name}</h1>
            <h1>Price: Rs. {product.price}</h1>
            <h1>Rating: {product.rating}</h1>
            {isPresentInCart === undefined ? (
              <button className="btn" onClick={this.handleAddToCart}>
                Add to cart
              </button>
            ) : (
              <>
                <button className="btn" onClick={() => this.handleDecreaseQty(isPresentInCart.id, isPresentInCart.qty, isPresentInCart.name, isPresentInCart.price, isPresentInCart.rating, isPresentInCart.productID)}>
                  -
                </button>
                <h2 className="qty">{isPresentInCart.qty}</h2>
                <button className="btn" onClick={() => this.handleInceaseQty(isPresentInCart.id, isPresentInCart.qty, isPresentInCart.name, isPresentInCart.price, isPresentInCart.rating, isPresentInCart.productID)}>
                  +
                </button>
                <button className="btn" onClick={() => this.handleRemoveFromCart(isPresentInCart.id)}>
                  Remove from cart
                </button>
              </>
            )}
          </>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    product: state.products.product,
    cartItems: state.cart.cartItems,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    getSingleProduct,
    addToCart,
    increaseQty,
    decreaseQty,
    removeItem,
    removeFromCart,
    getTotal,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ProductInfo);
