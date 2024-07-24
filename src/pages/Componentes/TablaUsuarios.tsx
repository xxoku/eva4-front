import React, { useEffect, useState } from 'react';
import { Table, Container, Modal } from 'react-bootstrap';
import { Persona } from '@/Interfaces/IPersona';
import { borrarUsuario, obtenerPersonas } from '@/Firebase/Promesas';
import Link from "next/link";
import Button from 'react-bootstrap/Button'
import { MdDelete } from 'react-icons/md';
import { FaEdit } from 'react-icons/fa';

const TablaUsuarios = () => {
  const [usuarios, setUsuarios] = useState<Persona[]>([]);
  const [show, setShow] = useState(false);
  const [usuarioBorrar, setUsuario] = useState<Persona | null>(null);

  useEffect(()=>{
    //Traer listado de personas desde las promesas
    obtenerPersonas().then((usuarios)=>{
        //Meter el listado dentro del estado
        setUsuarios(usuarios)
    }).catch((e)=>{
        console.log(e)
        alert("Algo ocurrio")
    })
  },[])

  const handleClose = () => setShow(false);
  const handleShow = (usuario: Persona) => {
    setUsuario(usuario);
    setShow(true);
  };

  const handleBorrarUsuario = async () => {
    if (usuarioBorrar) {
      try {
        await borrarUsuario(usuarioBorrar);
        setUsuarios(usuarios.filter(usuario => usuario.key !== usuarioBorrar.key))
      } catch (e) {
        console.error(e)
        alert("No se puede borrar el Usuario")
      } finally {
        handleClose()
      }
    }
  }


  return (
    <Container>
      <h1>Usuarios Registrados</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Usuario</th>
            <th>Contraseña</th>
            <th>Accion</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario.key}>
              <td>{usuario.usuario}</td>
              <td>{usuario.contraseña}</td>
              <td>
              <Link href={{pathname:'EditarUsuarios',query:{key:usuario.key}}}>
              <Button variant='warning'><FaEdit /></Button>
              </Link>
              <Button variant='danger' onClick= {() => handleShow(usuario)} ><MdDelete /></Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmación para Eliminar</Modal.Title>
        </Modal.Header>
        <Modal.Body>Estas seguro de eliminar el usuario? </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar.
          </Button>
          <Button variant="primary" onClick={handleBorrarUsuario}>
            Confirmar.
          </Button>
        </Modal.Footer>
      </Modal>
      <Link href={'/Componentes/Menu'}><Button variant='success'>Volver a Menu</Button></Link>
    </Container>
  );
};

export default TablaUsuarios;