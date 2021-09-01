import React from "react";
import { Nav, Navbar, Container } from "react-bootstrap";
import { NavLink, Link } from "react-router-dom";

export default function Header({ location }) {
  const user = localStorage.getItem("userInfo");
  const logoutHandler = (e) => {
    e.preventDefault();
    localStorage.removeItem("userInfo");
    window.location.replace("/");
  };
  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>
            <span className="sitename">Havictivity.</span>
          </Navbar.Brand>
          <Nav className="ms-auto nav">
            <NavLink
              exact={true}
              activeClassName="active"
              className="navLink"
              to="/"
            >
              Home
            </NavLink>

            {user ? (
              <NavLink to="" className="navLink" onClick={logoutHandler}>
                Logout
              </NavLink>
            ) : (
              <>
                <NavLink
                  exact={true}
                  activeClassName="active"
                  className="navLink"
                  to="/login"
                >
                  Login
                </NavLink>
                <NavLink
                  exact={true}
                  activeClassName="active"
                  className="navLink"
                  to="/register"
                >
                  Register
                </NavLink>
              </>
            )}
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}
