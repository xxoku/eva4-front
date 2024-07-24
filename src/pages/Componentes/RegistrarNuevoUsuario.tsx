import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Persona } from '@/Interfaces/IPersona'
import { registrarPersona } from '@/Firebase/Promesas'
import Link from "next/link";
import { Alert } from 'react-bootstrap'


const initialState:Persona = {
    usuario:"",
    contraseña:"",
}

export const RegistrarNuevoUsuario = () => {
    const [persona, setPersona] = useState<Persona>(initialState)
    const [error, setError] = useState<string>("");


    const handlePersona = (name:string,value:string)=>{
        setPersona({...persona,[name]:value})
    }

    const registrar = () => {
        if (!persona.usuario || !persona.contraseña) {
            setError("Todos los campos son obligatorios");
            return;
        }

    
        registrarPersona(persona).then(()=>{
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
    <h1>Registros de Usuarios.</h1>
    <p>Para registrar un usuario rellena con los datos aquí: </p>
    <Form>
        <Form.Group>
            <Form.Label>Usuario:</Form.Label>
            <Form.Control  type='text' placeholder='Ingrese su Usuario: '
            name="usuario"
            onChange={(e)=>{handlePersona(e.currentTarget.name,e.currentTarget.value)}} />
            <Form.Text></Form.Text>
        </Form.Group>
        <Form.Group>
            <Form.Label>Contraseña:</Form.Label>
            <Form.Control  type='password' placeholder='Ingrese su Contraseña: '
             name="contraseña"
             onChange={(e)=>{handlePersona(e.currentTarget.name,e.currentTarget.value)}} />
            
            <Form.Text></Form.Text>
        </Form.Group>
        {error && <Alert variant= "danger">{error}</Alert>}
        <Button type="button" variant='success'
            onClick={registrar}>Registrar</Button> <br /> <br />
        <Link href={'/Componentes/Menu'}><Button variant='success'>Volver a Menu</Button></Link>
    </Form>
    </>
  )
}
export default RegistrarNuevoUsuario