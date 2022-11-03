import React, { Fragment, useEffect } from "react";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { getProductsAction } from "../actions/productActions";

const Products = () => {
  const dispatch = useDispatch();

  useEffect(() => {

    // Consultar la api
    const loadProducts = () => dispatch(getProductsAction());
    loadProducts();
    
  }, []);

  return (
    <Fragment>
      <h2 className="text-center my-5">Listado de Productos</h2>
      <table className="table table-striped">
        <thead className="bg-primary table-dark">
          <tr>
            <th scope="col">Nombre</th>
            <th scope="col">Precio</th>
            <th scope="col">Acciones</th>
          </tr>{" "}
        </thead>
        <tbody></tbody>
      </table>
    </Fragment>
  );
};

export default Products;
