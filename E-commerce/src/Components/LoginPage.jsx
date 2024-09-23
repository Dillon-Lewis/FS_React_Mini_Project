import React, { useState } from "react";
import axios from "axios";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.get("http://127.0.0.1:5000/customers");
      const customers = response.data;

      const customer = customers.find(
        (auth) => auth.email === email && auth.user_password === password
      );

      if (customer) {
        sessionStorage.setItem("user", JSON.stringify(customer));

        console.log("Login successful:", customer);
        navigate("/home");
      } else {
        setError("Invalid email or password");
      }
    } catch (error) {
      setError("An error occurred while fetching customers.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar bg="danger" expand="md">
        <Navbar.Brand href="/">
          <img
            src="/public/SuperSaverLogo.png"
            width="50"
            alt="Super Saver Logo"
            className="logo mx-4"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        </Navbar.Collapse>
      </Navbar>
      <div className="container mt-5">
        <h1 className="text-center">Welcome to Super Savers!</h1>
        <h2 className="text-center mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          {error && <div className="alert alert-danger">{error}</div>}
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              autoComplete="on"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              autoComplete="on"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button type="submit" variant="primary w-100" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </Button>
          <Link to="/addcustomers">
            <Button variant="outline-secondary m-4">Sign-Up Today!</Button>
          </Link>
        </form>
      </div>
    </>
  );
};

export default Login;
