import React from "react";
import { Link } from "react-router-dom";

import { Navbar, Nav, NavItem, NavLink, NavbarBrand } from "reactstrap";

export default function Navigation(props) {
  return (
    <div className="navBar">
      <Navbar dark>
        <NavbarBrand to="/" tag={Link}>
          Volcanoes of the World
        </NavbarBrand>
        <Nav className="nav">
          <NavItem>
            <NavLink to="/" tag={Link}>
              Home
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/volcano-list" tag={Link}>
              Volcano List
            </NavLink>
          </NavItem>
          {props.login === null && ( // Using logical && Inline if
            <NavItem>
              <NavLink to="/register" tag={Link}>
                Register
              </NavLink>
            </NavItem>
          )}
          <NavItem>
            <NavLink to="/login" tag={Link}>
              {props.login === null ? "Login" : "Logout"}
            </NavLink>
          </NavItem>
        </Nav>
      </Navbar>
    </div>
  );
}
