import React from "react";
import { NavLink, Link } from "react-router-dom";
import { connect } from "react-redux";
import { getTotal } from "../../actions/cart";
import "./Navbar.css";

class Navbar extends React.Component {
  render() {
    return (
      <div className="header_nav">
        <div className="nav_content">
          <h2 className="logo">Ecommerce App</h2>
          <nav className="nav">
            <ul className="nav_list">
              <li className="nav_item">
                <NavLink to="/home" className="nav_link">
                  Home
                </NavLink>
              </li>
              <li className="nav_item">
                <NavLink to="/add-product" className="nav_link">
                  Add Product
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
        <div className="cart">
          <Link to="/cart" className="btn btn-login">
            Cart {this.props.count}
          </Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    count: state.cart.cartCount,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    getTotal,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
