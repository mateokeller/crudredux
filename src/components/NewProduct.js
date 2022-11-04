import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// Actions de Redux
import { CreateNewProductAction } from "../actions/productActions.js";

const NewProducts = () => {
  let navigate = useNavigate();

  // state del componente
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  // useDispatch
  const dispatch = useDispatch();

  // acceder al state del store
  const loading = useSelector((state) => state.products.loading);
  const error = useSelector((state) => state.products.error);

  const addProduct = (product) => dispatch(CreateNewProductAction(product));

  // When user submits
  const submitNewProduct = (e) => {
    e.preventDefault();

    //validate form
    if (name.trim() === "" || price <= 0) {
      return;
    }

    // check errors

    // create new product
    addProduct({
      name,
      price,
    });

    //redireccionar
    navigate("/");
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card">
          <div className="card-body">
            <h2 className="text-center mb-4 font-weight-bold">
              Agregar Nuevo Producto
            </h2>

            <form action="" onSubmit={submitNewProduct}>
              <div className="form-group">
                <label htmlFor="">Nombre Producto</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nombre Producto"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="">Precio Producto</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="0"
                  name="price"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
              >
                Agregar
              </button>
            </form>

            {loading ? <p>Loading...</p> : null}
            {error ? (
              <p className="alert alert-danger p2 mt-4 text-center">
                Hubo un error
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewProducts;
