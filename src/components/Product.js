import React from "react";
import { Link, useHistory } from "react-router-dom";
import Swal from "sweetalert2";

// Redux
import { useDispatch } from "react-redux";
import { deleteProductAction } from "../actions/productActions";

export default function Product({ product }) {
  const { name, price, id } = product;

  const dispatch = useDispatch();

  //  Confirmar si desea eliminarlo
  const confirmDeleteProduct = (id) => {
    //  preguntar al usuario
    Swal.fire({
      title: "¿Estas seguro?",
      text: "Un producto que se elimina no se puede recuperar!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Eliminar!",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        //  pasarlo al dispatch
        dispatch(deleteProductAction(id));
      }
    });
  };

  return (
    <tr>
      <td>{name}</td>
      <td>
        <span className="font-weight-bold">$ {price}</span>{" "}
      </td>
      <td className="actions">
        <Link to={`/products/edit/${id}`} className="btn btn-primary mr-2">
          Editar
        </Link>
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => confirmDeleteProduct(id)}
        >
          Eliminar
        </button>
      </td>
    </tr>
  );
}
