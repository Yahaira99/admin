import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar } from "react-bootstrap";
import './Header.css';
import unnamed from './unnamed.png';

function Header({ titulo }) {
    return (
        <Navbar className="nav" variant="dark">
            <Navbar.Brand >
                <img className="img"
                    alt=""
                    src={unnamed}
                    width="140"
                    height="50"
                />
            </Navbar.Brand>
            <h1 className="titulo2">{titulo}</h1>
        </Navbar>

    );
}

export default Header;
