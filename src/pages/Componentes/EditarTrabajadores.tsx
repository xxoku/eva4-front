import { actualizarPersona, obtenerPersona } from '@/Firebase/Promesas'
import { Trabajadores } from '@/Interfaces/ITrabajadores'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { Alert, Button, Form } from 'react-bootstrap'
import { SiRiotgames } from 'react-icons/si'


const initialState:Trabajadores = {
    apellido:"",
    correo:"",
    edad:0,
    puesto:"",
    nombre:"",
    rut:""
}

export const EditarTrabajadores = () => {
    const router = useRouter();
    const [trabajadores, setTrabajadores] = useState<Trabajadores>(initialState)
    const [error, setError] = useState<string>("");

    const handletrabajadores = (name:string,value:string)=>{
        setTrabajadores({...trabajadores,[name]:value})
    }

    useEffect(()=>{
        const key = router.query.key;
        if(key!=undefined && typeof(key)=="string"){
            obtenerPersona(key).then((p)=>{
                if(p!=undefined){
                    setTrabajadores(p)
                }
                else{
                    //Volver a la tabla
                }
            })
        }else{
            //Volver a la tabla
        }
        
    },[])

    const modificar = ()=>{
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
        
            actualizarPersona(trabajadores).then(()=>{
                alert("Se actualiza con exito")
            })
        }
  return (
    <>
        <Form>
        <Form.Group>
            <Form.Label>Nombre:</Form.Label>
            <Form.Control  type='text' placeholder='Ingrese su nombre: '
            value={trabajadores.nombre}
            name="nombre"
            onChange={(e)=>{handletrabajadores(e.currentTarget.name,e.currentTarget.value)}} />
            <Form.Text></Form.Text>
        </Form.Group>
        <Form.Group>
            <Form.Label>Apellido:</Form.Label>
            <Form.Control  type='text' placeholder='Ingrese su apellido: '
            value={trabajadores.apellido}
             name="apellido"
             onChange={(e)=>{handletrabajadores(e.currentTarget.name,e.currentTarget.value)}} />
            
            <Form.Text></Form.Text>
        </Form.Group>
        <Form.Group>
            <Form.Label>Rut:</Form.Label>
            <Form.Control  type='text' placeholder='Ej: 123456789 ' 
            value={trabajadores.rut}
             name="rut"
             onChange={(e)=>{handletrabajadores(e.currentTarget.name,e.currentTarget.value)}} />
             
            <Form.Text></Form.Text>
        </Form.Group>
        <Form.Group>
            <Form.Label>Correo:</Form.Label>
            <Form.Control  type='email' placeholder='Ingrese su correo: ' 
            value={trabajadores.correo}
             name="correo"
             onChange={(e)=>{handletrabajadores(e.currentTarget.name,e.currentTarget.value)}} />
             
            <Form.Text></Form.Text>
        </Form.Group>
        <Form.Group>
            <Form.Label>Puesto a postular:</Form.Label>
            <Form.Control  type='text' placeholder='Ingrese una breve descripcion del puesto a ocupar: ' 
             value={trabajadores.puesto}
             name="puesto"
             onChange={(e)=>{handletrabajadores(e.currentTarget.name,e.currentTarget.value)}} />
             
            <Form.Text></Form.Text>
        </Form.Group>
        <Form.Group>
            <Form.Label>Edad:</Form.Label>
            <Form.Control  type='number' placeholder='Ingrese su edad: ' 
            value={trabajadores.edad}
             name="edad"
             onChange={(e)=>{handletrabajadores(e.currentTarget.name,e.currentTarget.value)}} />
             
            <Form.Text></Form.Text>
        </Form.Group>
        {error && <Alert variant= "danger">{error}</Alert>}
        <Button type="button" variant='success'
            onClick={modificar} ><SiRiotgames />Modificar</Button> <br /> <br />
        <Link href={'/Componentes/Menu'}><Button variant='success'>Volver a Menu</Button></Link>
    </Form>
    </>
  )
}
export default EditarTrabajadores