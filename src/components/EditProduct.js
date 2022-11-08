import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editProductAction } from "../actions/productActions";

export default function EditProduct() {
  //  nuevo state de producto
  const [product, setProduct] = useState({
    name: "",
    price: "",
  });

  // producto a editar
  const editProduct = useSelector((state) => state.products.editProduct);

  //  llenar el state automaticamente
  useEffect(() => {
    setProduct(editProduct);
  }, [editProduct]);

  // leer los datos del formulario
  const handleForm = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const { name, price, id } = product;

  const submitEditProduct = (e) => {
    e.preventDefault();

    editProductAction();
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card">
          <div className="card-body">
            <h2 className="text-center mb-4 font-weight-bold">
              Editar Producto
            </h2>

            <form onSubmit={submitEditProduct} action="">
              <div className="form-group">
                <label htmlFor="">Nombre Producto</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nombre Producto"
                  name="name"
                  value={name}
                  onChange={handleForm}
                />
              </div>

              <div className="form-group">
                <label htmlFor="">Precio Producto</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Precio Producto"
                  name="price"
                  value={price}
                  onChange={handleForm}
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
              >
                Guardar Cambios
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
