import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Navbar, Nav, Button } from "react-bootstrap";

function Navigation() {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("user"); 
    navigate("/"); 
  };

  return (
    <Navbar bg="danger" expand="md">
      <Navbar.Brand href="/home">
        <img
          src="/public/SuperSaverLogo.png"
          width="50"
          alt="Super Saver Logo"
          className="logo mx-4"
        />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="m-auto">
          <Nav.Link as={NavLink} to="/home" activeclassname="active">
            Home
          </Nav.Link>
          <Nav.Link as={NavLink} to="/products" activeclassname="active">
            Products
          </Nav.Link>
          <Nav.Link as={NavLink} to="/customers" activeclassname="active">
            Customers
          </Nav.Link>
          <Nav.Link as={NavLink} to="/shopping_cart" activeclassname="active">
            Shopping Cart
          </Nav.Link>
        </Nav>
        <Button variant="mx-4" onClick={handleLogout}>
          Logout
        </Button>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Navigation;
