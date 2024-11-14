import React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

function NavbarNav() {
    return (
        <Navbar expand="lg" className="nav-nav">
            <Container fluid={true}>
                <Navbar.Brand href="#home" className='nav-title'>Koperasi</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav"></Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavbarNav