import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { db } from "./Firebase";
import { Persona } from "@/Interfaces/IPersona";
import { Trabajadores } from "@/Interfaces/ITrabajadores";

export const registrarPersona = async(persona:Persona)=>{
    const docRef = await addDoc(collection(db, "usuarios"), persona);
}

export const registrarTrabajador = async(persona:Trabajadores)=>{
    const docRef = await addDoc(collection(db, "personas"), persona);
}

export const obtenerPersonaPorUsuario = async (usuario: string) => {
    const q = query(collection(db, "usuarios"), where("usuario", "==", usuario));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0]; // busca en la lista
      const persona: Persona = {
        usuario: doc.data().usuario,
        contraseña: doc.data().contraseña,
        key: doc.id,
      };
      return persona;
    } else {
      return null;
    }
  };


export const obtenerTrabajadores = async()=>{
    let personas:Trabajadores[] = []
    const querySnapshot = await getDocs(collection(db, "personas"));
    querySnapshot.forEach((doc) => {
        let persona:Trabajadores = {
            rut:doc.data().rut,
            apellido:doc.data().apellido,
            correo:doc.data().correo,
            edad:doc.data().edad,
            puesto:doc.data().puesto,
            nombre:doc.data().nombre,
            key:doc.id
        }
        personas.push(persona)
    });
    return personas
}

export const obtenerPersonas = async()=>{
    let usuarios:Persona[] = []
    const querySnapshot = await getDocs(collection(db, "usuarios"));
    querySnapshot.forEach((doc) => {
        let usuario:Persona = {
            usuario:doc.data().usuario,
            contraseña:doc.data().contraseña,
            key:doc.id
        }
        usuarios.push(usuario)
    });
    return usuarios
}



export const obtenerPersona = async(key:string)=>{
    const docRef = doc(db, "personas", key);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        let persona:Trabajadores = {
            rut:docSnap.data().rut,
            apellido:docSnap.data().apellido,
            correo:docSnap.data().correo,
            edad:docSnap.data().edad,
            puesto:docSnap.data().puesto,
            nombre:docSnap.data().nombre,
            key:docSnap.id
        }
        return persona
    } else {
      return undefined
    }
}

export const obtenerUsuario = async(key:string)=>{
    const docRef = doc(db, "usuarios", key);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        let usuario:Persona = {
            usuario:docSnap.data().usuario,
            contraseña:docSnap.data().contraseña,
            key:docSnap.id
        }
        return usuario
    } else {
      return undefined
    }
}

export const actualizarPersona = async(t:Trabajadores)=>{
    const ref = doc(db,"personas",t.key!)
    await updateDoc(ref,{...t})
}

export const actualizarUsuario = async(usuario:Persona)=>{
    const ref = doc(db,"usuarios",usuario.key!)
    await updateDoc(ref,{...usuario})
}

export const borrarTrabajador = async (t:Trabajadores) => {
    const docRef = doc(db, "personas", t.key!);
    await deleteDoc(docRef);
};

export const borrarUsuario = async (usuario:Persona) => {
    const docRef = doc(db, "usuarios", usuario.key!);
    await deleteDoc(docRef);
};