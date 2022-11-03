import { ADD_PRODUCT, ADD_PRODUCT_SUCCESS, ADD_PRODUCT_ERROR } from "../types";
import axiosClient from "../config/axios";
import Swal from "sweetalert2";

// Crear nuevos productos

export function CreateNewProductAction(product) {
  return async (dispatch) => {
    dispatch(addProduct());

    try {
      // insertar en la  API
      await axiosClient.post("/products", product);

      // si todo sale bien, actualizar el state
      dispatch(AddProductSuccess(product));

      // Alerta
      Swal.fire("Correcto", "El producto se agregó correctamente", "success");
    } catch (error) {
      console.log(error);
      // si hay un error cambiar el state
      dispatch(AddProductError(true));

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
const AddProductSuccess = (product) => ({
  type: ADD_PRODUCT_SUCCESS,
  payload: product,
});

// si hubo un error
const AddProductError = (state) => ({
  type: ADD_PRODUCT_ERROR,
  payload: state,
});
