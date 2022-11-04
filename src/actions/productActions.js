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
import axiosClient from "../config/axios";
import Swal from "sweetalert2";

// Crear nuevos productos

export function CreateNewProductAction(product) {
  return async (dispatch) => {
    dispatch(addProduct());

    try {
      // insertar en la  API
      const response = await axiosClient.post("/products", product);

      // si todo sale bien, actualizar el state
      dispatch(addProductSuccess(response.data));

      // Alerta
      Swal.fire("Correcto", "El producto se agregó correctamente", "success");
    } catch (error) {
      // si hay un error cambiar el state
      dispatch(addProductError(true));

      // Alerta de error
      Swal.fire({
        icon: "error",
        title: "Hubo un error",
        text: "hubo un error, intenta de nuevo",
      });
    }
  };
}

const addProduct = () => ({
  type: ADD_PRODUCT,
  payload: true,
});

// si el producto se guarda en la base de datos
const addProductSuccess = (product) => ({
  type: ADD_PRODUCT_SUCCESS,
  payload: product,
});

// si hubo un error
const addProductError = (state) => ({
  type: ADD_PRODUCT_ERROR,
  payload: state,
});

// Funcion que descarga los productos de la base de datos

export function getProductsAction() {
  return async (dispatch) => {
    dispatch(downloadProducts());

    try {
      //insertar la api
      const response = await axiosClient.get("/products");
      dispatch(productsDownloadSuccess(response.data));
    } catch (error) {
      dispatch(productsDownloadError());
    }
  };
}

const downloadProducts = () => ({
  type: BEGIN_PRODUCTS_DOWNLOAD,
  payload: true,
});

//  si la descarga es exitosa
const productsDownloadSuccess = (products) => ({
  type: PRODUCTS_DOWNLOAD_SUCCESS,
  payload: products,
});

const productsDownloadError = () => ({
  type: PRODUCTS_DOWNLOAD_ERROR,
  payload: true,
});

// selecciona y elimina el producto

export function deleteProductAction(id) {
  return async (dispatch) => {
    dispatch(getDeleteProducts(id));

    try {
      //insertar la api
      await axiosClient.delete(`/products/${id}`);
      dispatch(deleteProductSuccess());
    } catch (error) {}
  };
}

const getDeleteProducts = (id) => ({
  type: GET_DELETE_PRODUCT,
  payload: id,
});

const deleteProductSuccess = () => ({
  type: DELETE_PRODUCT_SUCCESS,
});

const deleteProductError = () => ({
  type: DELETE_PRODUCT_ERROR,
  payload: true,
});
