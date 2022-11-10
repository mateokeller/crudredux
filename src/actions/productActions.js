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
  GET_EDIT_PRODUCT,
  BEGIN_EDIT_PRODUCT,
  EDIT_PRODUCT_SUCCESS,
  EDIT_PRODUCT_ERROR,
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

      //  si se elimina, mostrar alerta
      Swal.fire(
        "Eliminado!",
        "El producto se elimino correctamente.",
        "success"
      );
    } catch (error) {
      console.log(error);
      dispatch(deleteProductError());
    }
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

// Colocar prpoducto en edicion
export function getEditProduct(product) {
  return (dispatch) => {
    dispatch(getEditProductAction(product));
  };
}

const getEditProductAction = (product) => ({
  type: GET_EDIT_PRODUCT,
  payload: product,
});

// edita un registro en la api y state
export function editProductAction(product) {
  return async (dispatch) => {
    dispatch(editProduct());

    try {
      await axiosClient.put(`/products/${product.id}`, product);
      dispatch(editProductSuccess(product));
    } catch (error) {
      console.log(error);
      dispatch(editProductError());
    }
  };
}

const editProduct = (product) => ({
  type: BEGIN_EDIT_PRODUCT,
});

const editProductSuccess = (product) => ({
  type: EDIT_PRODUCT_SUCCESS,
  payload: product,
});

const editProductError = (product) => ({
  type: EDIT_PRODUCT_ERROR,
  payload: true,
});
