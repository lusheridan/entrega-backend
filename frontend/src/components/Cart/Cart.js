import React, { useState, useEffect } from "react";
import { Table, Button, Alert, Container, Form } from "react-bootstrap";
import { FaTrashAlt } from "react-icons/fa";
import api from "../../helpers/api";

export const Cart = () => {
  const [cart, setCart] = useState({});
  const [productId, setProductId] = useState();

  useEffect(() => {
    api.post("carrito").then((result) => {
      setCart(result.data);
    });
  }, []);
  const renderProduct = (element, index) => {
    return (
      <tr key={index}>
        <td>{index + 1}</td>
        <td>{element.codigo}</td>
        <td>{element.nombre}</td>
        <td>{element.descripcion}</td>
        <td>{`$${element.precio}`}</td>
        <td>
          <Button
            variant="dark"
            onClick={() => {
              api
                .delete(`carrito/${cart.id}/productos/${element.id}`)
                .then((result) => {
                  setCart(result.data);
                });
            }}
          >
            <FaTrashAlt />
          </Button>
        </td>
      </tr>
    );
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    console.log("esto es productId", productId);
    api
      .post(`carrito/${cart.id}/productos`, {
        productId: parseInt(productId),
      })
      .then(function (result) {
        setCart(result.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Container>
        <Form>
          <Form.Group
            className="mb-3"
            controlId="id"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
          >
            <h2>Agregar Producto por ID</h2>
            <Form.Control type="number" name="id" value={productId} />
          </Form.Group>
          <Button variant="dark" onClick={handleAddProduct} type="submit">
            Agregar
          </Button>
        </Form>
      </Container>
      {cart.productos ? (
        <Container>
          <h2>Carrito</h2>
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>#</th>
                <th>Código</th>
                <th>Producto</th>
                <th>Descripción</th>
                <th>Precio</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {(cart.productos ?? []).map((element, index) =>
                renderProduct(element, index)
              )}
            </tbody>
          </Table>
        </Container>
      ) : (
        <Alert variant="warning">
          Todavía no agregaste nada a tu carrito :C
        </Alert>
      )}
    </>
  );
};
