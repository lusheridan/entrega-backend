import React from "react";
import { Card, Button } from "react-bootstrap";
import { FaTrashAlt } from "react-icons/fa";
import api from "../../helpers/api";
import isAdmin from "../../helpers/isAdmin";
import ProductForm from "./ProductForm";

export const Product = ({
  id,
  nombre,
  descripcion,
  codigo,
  url,
  precio,
  stock,
}) => {
  return (
    <Card style={{ width: "22rem" }} className="m-3">
      <Card.Img variant="top" src={url} />
      <Card.Body>
        <Card.Title>
          #{id} - {nombre}
        </Card.Title>
        <Card.Text>Descripcíon: {descripcion}</Card.Text>
        <Card.Text>Precio: ${precio}</Card.Text>
        <Card.Text>Código: #{codigo}</Card.Text>
        <Card.Text>Stock: {stock}</Card.Text>
        {isAdmin && (
          <>
            {" "}
            <ProductForm productId={id} />
            <Button
              variant="dark"
              style={{ margin: 7 }}
              onClick={() => {
                api
                  .delete(`http://localhost:8080/api/productos/${id}`)
                  .then(function () {
                    window.location.reload(false);
                  })
                  .catch((err) => console.log(err));
              }}
            >
              <FaTrashAlt size="1em" />
            </Button>
          </>
        )}
      </Card.Body>
    </Card>
  );
};
