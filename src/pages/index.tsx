import Link from "next/link";
import React, { useState } from 'react'
import { Alert, Button, Form } from 'react-bootstrap';
import { useRouter } from "next/router";
import { obtenerPersonaPorUsuario } from "@/Firebase/Promesas";




export default function Home() {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState ("")
  const [error, setError] = useState("");
  const router = useRouter ()

  const handleLogin = async () => {
    if (!usuario || !password) {
      setError("Todos los campos son Obligatorios");
      return;
    }

    try {
      const persona = await obtenerPersonaPorUsuario(usuario);
      if (persona && persona.contraseña === password) {
        router.push('/Componentes/Menu');  // Redirige al menú principal
      } else {
        setError("Usuario o Contraseña incorrectos");
      }
    } catch (e) {
      console.error(e);
      setError("Error al intentar iniciar sesión");
    }
  };

 
  return (
    <>
      <h1>Login</h1>
      <Form>
        <Form.Group controlId="formUser">
          <Form.Label>Usuario</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingrese su Nombre"
            value={usuario}
            onChange={(e) => setUsuario(e.currentTarget.value)}
          />
        </Form.Group>
        <Form.Group controlId="formPassword">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            type="password"
            placeholder="Ingrese su Contraseña"
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
          />
        </Form.Group>
        {error && <Alert variant= "danger">{error}</Alert>}
        <Button variant="primary" type="button" onClick={handleLogin} >Login</Button>
      </Form>
    </>
  );
}