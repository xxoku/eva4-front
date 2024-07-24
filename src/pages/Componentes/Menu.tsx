import { useRouter } from 'next/router';
import { Navbar, Nav, Container } from 'react-bootstrap';
import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';


const Menu = () => {
  const router = useRouter();

  const handleSelect = (selectedKey: string | null) => {
    if (selectedKey) {
      router.push(selectedKey);
    }
  };

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#">Menú Principal</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto" onSelect={handleSelect}>
            <Nav.Link eventKey="/Componentes/RegistrarNuevoUsuario">Registrar nuevo usuario</Nav.Link>
            <Nav.Link eventKey="/Componentes/RegistrarTrabajador">Registrar Trabajador</Nav.Link>
            <Nav.Link eventKey="/Componentes/TablaUsuarios">Ver Tabla Usuarios</Nav.Link>
            <Nav.Link eventKey="/Componentes/TablaTrabajadores">Ver Tabla Trabajadores</Nav.Link>
            <Nav.Link eventKey="/">Salir</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Menu;