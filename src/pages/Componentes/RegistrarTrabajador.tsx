import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { registrarTrabajador } from '@/Firebase/Promesas'
import Link from "next/link";
import { Trabajadores } from '@/Interfaces/ITrabajadores'
import { SiRiotgames } from "react-icons/si";
import { Alert } from 'react-bootstrap'


const initialState:Trabajadores = {
    nombre:"",
    apellido:"",
    rut:"",
    correo:"",
    edad:0,
    puesto:"",
}

export const RegistrarTrabajador = () => {
    const [trabajadores, setTrabajadores] = useState<Trabajadores>(initialState)
    const [error, setError] = useState<string>("");

    const handletrabajadores = (name:string,value:string)=>{
        setTrabajadores({...trabajadores,[name]:value})
    }

    const validarRut = (rut: string): boolean => {
        if (rut.length !== 9) {
            return false;
        }
        for (let i = 0; i < rut.length; i++) {
            if (!"0123456789".includes(rut[i])) {
                return false;
            }
        }
        return true;
    }



    const registrar = () => {
        if (!trabajadores.nombre || !trabajadores.apellido || !trabajadores.rut || !trabajadores.correo || !trabajadores.puesto || !trabajadores.edad ) {
            setError("Todos los campos son obligatorios");
            return;
        }

        if (!validarRut(trabajadores.rut)) {
            setError("El rut debe tener 9 digitos sin guión ni puntos y no debe ser negativo");
            return;
        }

        if (trabajadores.edad < 0) {
            setError("La edad no puede estar en negativa");
            return;
        }
            registrarTrabajador(trabajadores).then(()=>{
                alert("Se logro registrar")
                setError("")
            }).catch((e)=>{
                console.log(e);
                alert("Algo ocurrio")
            })
        }    


  return (
    <>
    {/* nombre,apellido,correo,fechaNacimiento,edad,rut */}
    <h1>Trabaja en Riot con Nosotros aquí: </h1>
    <Form>
        <Form.Group>
            <Form.Label>Nombre:</Form.Label>
            <Form.Control  type='text' placeholder='Ingrese su nombre: '
            name="nombre"
            onChange={(e)=>{handletrabajadores(e.currentTarget.name,e.currentTarget.value)}} />
            <Form.Text></Form.Text>
        </Form.Group>
        <Form.Group>
            <Form.Label>Apellido:</Form.Label>
            <Form.Control  type='text' placeholder='Ingrese su apellido: '
             name="apellido"
             onChange={(e)=>{handletrabajadores(e.currentTarget.name,e.currentTarget.value)}} />
            
            <Form.Text></Form.Text>
        </Form.Group>
        <Form.Group>
            <Form.Label>Rut:</Form.Label>
            <Form.Control  type='text' placeholder='Ej: 123456789 ' 
             name="rut"
             onChange={(e)=>{handletrabajadores(e.currentTarget.name,e.currentTarget.value)}} />
             
            <Form.Text></Form.Text>
        </Form.Group>
        <Form.Group>
            <Form.Label>Correo:</Form.Label>
            <Form.Control  type='email' placeholder='Ingrese su correo: ' 
             name="correo"
             onChange={(e)=>{handletrabajadores(e.currentTarget.name,e.currentTarget.value)}} />
             
            <Form.Text></Form.Text>
        </Form.Group>
        <Form.Group>
            <Form.Label>Puesto a postular:</Form.Label>
            <Form.Control  type='text' placeholder='Ingrese una breve descripcion del puesto a ocupar: ' 
             name="puesto"
             onChange={(e)=>{handletrabajadores(e.currentTarget.name,e.currentTarget.value)}} />
             
            <Form.Text></Form.Text>
        </Form.Group>
        <Form.Group>
            <Form.Label>Edad:</Form.Label>
            <Form.Control  type='number' placeholder='Ingrese su edad: ' 
             name="edad"
             onChange={(e)=>{handletrabajadores(e.currentTarget.name,e.currentTarget.value)}} />
             
            <Form.Text></Form.Text>
        </Form.Group>
        {error && <Alert variant= "danger">{error}</Alert>}
        <Button type="button" variant='success'
            onClick={registrar} ><SiRiotgames /> Registrar</Button> <br /> <br />
        <Link href={'/Componentes/Menu'}><Button variant='success'>Volver a Menu</Button></Link>
    </Form>
    </>
  )
}
export default RegistrarTrabajador