import { bindActionCreators } from "redux";
import {
  ADD_PRODUCT,
  ADD_PRODUCT_SUCCESS,
  ADD_PRODUCT_ERROR,
  BEGIN_PRODUCTS_DOWNLOAD,
  PRODUCTS_DOWNLOAD_SUCCESS,
  PRODUCTS_DOWNLOAD_ERROR,
  GET_DELETE_PRODUCT,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_ERROR,
} from "../types";

//cada reducer tiene su propio state
const initialState = {
  products: [],
  error: null,
  loading: false,
  deleteProduct: null,
};

export default function productReducer(state = initialState, action) {
  switch (action.type) {
    case BEGIN_PRODUCTS_DOWNLOAD:
    case ADD_PRODUCT:
      return {
        ...state,
        loading: action.payload,
      };

    case ADD_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        products: [...state.products, action.payload],
      };

    case ADD_PRODUCT_ERROR:
    case PRODUCTS_DOWNLOAD_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case PRODUCTS_DOWNLOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        products: action.payload,
      };
    case GET_DELETE_PRODUCT:
      return {
        ...state,
        deleteProduct: action.payload,
      };
    case DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        products: state.products.filter(
          (products) => products.id !== state.deleteProduct
        ),
      };

    default:
      return state;
  }
}
