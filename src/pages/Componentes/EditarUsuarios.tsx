import { actualizarUsuario, obtenerUsuario } from '@/Firebase/Promesas'
import { Persona } from '@/Interfaces/IPersona'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { Alert, Button, Form } from 'react-bootstrap'
import { SiRiotgames } from 'react-icons/si'


const initialState:Persona = {
    usuario:"",
    contraseña:""
}

export const EditarUsuarios = () => {
    const router = useRouter();
    const [persona, setPersona] = useState<Persona>(initialState)
    const [error, setError] = useState<string>("");

    const handlePersona = (name:string,value:string)=>{
        setPersona({...persona,[name]:value})
    }

    useEffect(()=>{
        const key = router.query.key;
        if(key!=undefined && typeof(key)=="string"){
            obtenerUsuario(key).then((p)=>{
                if(p!=undefined){
                    setPersona(p)
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
               if (!persona.usuario || !persona.contraseña) {
                setError("Todos los campos son obligatorios");
                return;
            }

            actualizarUsuario(persona).then(()=>{
                alert("Se actualiza con exito")
            })
        }
  return (
    <>
        <Form>
        <Form.Group>
            <Form.Label>Usuario:</Form.Label>
            <Form.Control  type='text' placeholder='Ingrese su Usuario: '
            value={persona.usuario}
            name="usuario"
            onChange={(e)=>{handlePersona(e.currentTarget.name,e.currentTarget.value)}} />
            <Form.Text></Form.Text>
        </Form.Group>
        <Form.Group>
            <Form.Label>Contraseña:</Form.Label>
            <Form.Control  type='password' placeholder='Ingrese su Contraseña: '
            value={persona.contraseña}
             name="contraseña"
             onChange={(e)=>{handlePersona(e.currentTarget.name,e.currentTarget.value)}} />
            
            <Form.Text></Form.Text>
        </Form.Group>
        {error && <Alert variant= "danger">{error}</Alert>}
        <Button type="button" variant='success'
            onClick={modificar}>Modificar</Button> <br /> <br />
        <Link href={'/Componentes/Menu'}><Button variant='success'>Volver a Menu</Button></Link>
    </Form>
    </>
  )
}
export default EditarUsuarios