import { Modal, Button, Form } from "react-bootstrap";
import { useState } from "react";
import api from "../../helpers/api";
import { FaEdit } from "react-icons/fa";

function ProductForm({ productId }) {
  const [show, setShow] = useState(false);
  const [values, setValues] = useState({});

  const handleInputChange = (e) => {
    setValues({
      ...values,
      [e.target.id]: e.target.value,
    });
  };

  const handleClose = () => setShow(false);
  const handleShow = () => {
    if (productId) {
      api.get(`productos/${productId}`).then((result) => {
        setValues(result.data);
        setShow(true);
      });
    } else {
      setShow(true);
    }
  };

  const handleCreateProduct = (e) => {
    e.preventDefault();

    if (productId) {
      api
        .put(`http://localhost:8080/api/productos/${productId}`, values)
        .then(function () {
          handleClose();
          window.location.reload(false);
        })
        .catch((err) => console.log(err));
    } else {
      api
        .post("http://localhost:8080/api/productos", values)
        .then(function () {
          handleClose();
          window.location.reload(false);
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <>
      {productId ? (
        <Button variant="dark" style={{ margin: 14 }} onClick={handleShow}>
          <FaEdit size="1em" />
        </Button>
      ) : (
        <Button variant="light" onClick={handleShow}>
          Agregar Producto
        </Button>
      )}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{productId ? "Editar" : "Agregar"} Producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group
              className="mb-3"
              controlId="nombre"
              value={values.nombre}
              onChange={handleInputChange}
            >
              <Form.Label>Producto:</Form.Label>
              <Form.Control type="text" name="nombre" value={values.nombre} />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="descripcion"
              value={values.descripcion}
              onChange={handleInputChange}
            >
              <Form.Label>Descripción:</Form.Label>
              <Form.Control
                type="text"
                name="descripcion"
                value={values.descripcion}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="codigo"
              value={values.codigo}
              onChange={handleInputChange}
            >
              <Form.Label>Código:</Form.Label>
              <Form.Control type="number" name="codigo" value={values.codigo} />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="url"
              value={values.url}
              onChange={handleInputChange}
            >
              <Form.Label>Foto:</Form.Label>
              <Form.Control type="text" name="url" value={values.url} />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="precio"
              value={values.precio}
              onChange={handleInputChange}
            >
              <Form.Label>Precio:</Form.Label>
              <Form.Control type="number" name="precio" value={values.precio} />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="stock"
              value={values.stock}
              onChange={handleInputChange}
            >
              <Form.Label>Stock:</Form.Label>
              <Form.Control type="number" name="stock" value={values.stock} />
            </Form.Group>
          </Form>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cerrar
            </Button>
            <Button
              variant="primary"
              onClick={handleCreateProduct}
              type="submit"
            >
              {productId ? "Editar" : "Agregar"}
            </Button>
          </Modal.Footer>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ProductForm;
