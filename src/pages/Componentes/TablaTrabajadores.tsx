import React, { useEffect, useState } from 'react';
import { Table, Container, Modal } from 'react-bootstrap';
import { obtenerTrabajadores, borrarTrabajador } from '@/Firebase/Promesas';
import Link from "next/link";
import Button from 'react-bootstrap/Button'
import { Trabajadores } from '@/Interfaces/ITrabajadores';
import { MdDelete } from 'react-icons/md';
import { FaEdit } from 'react-icons/fa';

const TablaTrabajadores = () => {
  const [trabajadores, setTrabajadores] = useState<Trabajadores[]>([]);
  const [show, setShow] = useState(false);
  const [trabajadorBorrar, setTrabajador] = useState<Trabajadores | null>(null);

  useEffect(()=>{
    //Traer listado de personas desde las promesas
    obtenerTrabajadores().then((trabajadores)=>{
        //Meter el listado dentro del estado
        setTrabajadores(trabajadores)
    }).catch((e)=>{
        console.log(e)
        alert("Algo ocurrio")
    })
  },[])

  const handleClose = () => setShow(false);
  const handleShow = (trabajador: Trabajadores) => {
    setTrabajador(trabajador);
    setShow(true);
  };

  const handleBorrarTrabajador = async () => {
    if (trabajadorBorrar) {
      try {
        await borrarTrabajador(trabajadorBorrar);
        setTrabajadores(trabajadores.filter(t => t.key !== trabajadorBorrar.key))
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
      <h1>Postulantes Registrados</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Rut</th>
            <th>Correo</th>
            <th>Puesto</th>
            <th>Edad</th>
            <th>Accion</th>
          </tr>
        </thead>
        <tbody>
          {trabajadores.map((t) => (
            <tr key={t.key}>
              <td>{t.nombre}</td>
              <td>{t.apellido}</td>
              <td>{t.rut}</td>
              <td>{t.correo}</td>
              <td>{t.puesto}</td>
              <td>{t.edad}</td>
              <td>
              <Link href={{pathname:'EditarTrabajadores',query:{key:t.key}}}>
              <Button variant='warning'><FaEdit /></Button>
              </Link>
              <Button variant='danger' onClick= {() => handleShow(t)}><MdDelete /></Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmación para Eliminar</Modal.Title>
        </Modal.Header>
        <Modal.Body>Estas seguro de eliminar al postulante? </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar.
          </Button>
          <Button variant="primary" onClick={handleBorrarTrabajador}>
            Confirmar.
          </Button>
        </Modal.Footer>
      </Modal>
      <Link href={'/Componentes/Menu'}><Button variant='success'>Volver a Menu</Button></Link>
    </Container>
  );
};

export default TablaTrabajadores;