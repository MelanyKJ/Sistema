//PERMITIRA REALIZAR PETICIOS CON EL BACKEND (NODE JS)
import axios from  'axios';

//API DEL BACK
const API = 'http://localhost:4000/api'; //URL DEL BACKEND

//FUNCION PARA REGISTRAR USUARIO
export const registerRequest  = (user) => axios.post(`${API}/register`,user);

//FUNCION PARA LOGUEAR USUARIO
export const loginRequest = user => axios.post(`${API}/login`, user);