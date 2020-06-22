import { GET_PRODUCTS, DELETE_PRODUCT, EDIT_PRODUCT, CANCEL_EDIT, SAVE_EDIT, ADD_PRODUCT, GET_SINGLE_PRODUCT, SORT } from "../actions/actionTypes";

const initialState = {
  productList: [],
  sortedProductList: [],
  product: null,
  editableProductNumber: null,
  showSortedProducts: false,
};
export default function products(state = initialState, action) {
  console.log(action);
  switch (action.type) {
    case GET_PRODUCTS:
      return {
        ...state,
        productList: action.payload,
      };
    case DELETE_PRODUCT:
      return {
        ...state,
        productList: state.productList.filter((product) => product.id !== action.payload),
      };
    case EDIT_PRODUCT:
      return {
        ...state,
        editableProductNumber: action.payload,
      };
    case CANCEL_EDIT:
      return {
        ...state,
        editableProductNumber: null,
      };
    case SAVE_EDIT:
      return {
        ...state,
        editableProductNumber: action.payload.editableProductNumber,
        productList: state.productList.map((product) => {
          if (product.id === action.payload.id) {
            return {
              ...action.payload.data,
              id: product.id,
            };
          }
          return product;
        }),
      };
    case ADD_PRODUCT:
      return {
        ...state,
        productList: [...state.productList, action.payload],
      };
    case GET_SINGLE_PRODUCT:
      return {
        ...state,
        product: action.payload,
      };
    case SORT:
      return {
        ...state,
        sortedProductList: state.productList.slice().sort((a, b) => {
          return a.price - b.price;
        }),
        showSortedProducts: !state.showSortedProducts,
      };
    default:
      return state;
  }
}
