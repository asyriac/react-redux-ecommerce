import { ADD_TO_CART, GET_CART, INCREASE_QTY, DECREASE_QTY, REMOVE_ITEM, REMOVE_FROM_CART, GET_TOTAL } from "../actions/actionTypes";

const initialState = {
  cartItems: [],
  cartCount: 0,
  totalCost: 0,
};
export default function cart(state = initialState, action) {
  console.log(action.type);
  switch (action.type) {
    case GET_CART:
      return {
        ...state,
        cartItems: action.payload,
      };
    case ADD_TO_CART:
      return {
        ...state,
        cartItems: [action.payload, ...state.cartItems],
      };
    case INCREASE_QTY:
      return {
        ...state,
        cartItems: state.cartItems.map((item) => {
          if (item.id === action.payload.id) {
            return {
              ...action.payload,
            };
          }
          return item;
        }),
      };
    case DECREASE_QTY:
      return {
        ...state,
        cartItems: state.cartItems.map((item) => {
          if (item.id === action.payload.id) {
            return {
              ...action.payload,
            };
          }
          return item;
        }),
      };
    case REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((item) => item.id !== action.payload),
      };
    case REMOVE_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter((item) => item.id !== action.payload),
      };
    case GET_TOTAL:
      let { cartCount, totalCost } = state.cartItems.reduce(
        (cart, item) => {
          const { qty, price } = item;
          const itemTotal = price * qty;
          cart.cartCount += qty;
          cart.totalCost += itemTotal;
          return cart;
        },
        { cartCount: 0, totalCost: 0 }
      );
      return {
        ...state,
        cartCount,
        totalCost,
      };
    default:
      return state;
  }
}
