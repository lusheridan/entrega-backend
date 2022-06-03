import React from "react";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import ProductForm from "../Products/ProductForm";
import { FaShoppingCart } from "react-icons/fa";
import isAdmin from "../../helpers/isAdmin";

export const NavBar = () => {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container fluid>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link>
              <NavLink
                activeClassName={"activeLink"}
                className="link"
                exact
                to="/"
              >
                {isAdmin && <ProductForm />}
              </NavLink>
            </Nav.Link>
            <Nav.Link>
              <NavLink
                activeClassName={"activeLink"}
                className="link"
                exact
                to="/carrito"
              >
                <Button variant="light">
                  <FaShoppingCart size="1em" /> Ir al Carrito
                </Button>{" "}
              </NavLink>
            </Nav.Link>
          </Nav>
          <Nav.Link>
            <NavLink
              activeClassName={"activeLink"}
              className="link"
              exact
              to="/"
            >
              <Button variant="light">Volver</Button>{" "}
            </NavLink>
          </Nav.Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default NavBar;
