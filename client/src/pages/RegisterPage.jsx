import {useForm} from 'react-hook-form'

import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function RegisterPage() {
    //EJECUTANDO EL HOOK
    const {
        register,
        handleSubmit,
        formState:{errors},
    } = useForm();

    //USEAUTH
    const {signup, isAuthenticated, errors: registerErrors} = useAuth ();
    //NAVEAGION
    const navigate = useNavigate();

    //Autenticacion
    useEffect(() =>{
        if(isAuthenticated) navigate('/task');
    },  [isAuthenticated]);



    //handleSubmit para registrar usuario
    const onSubmit = handleSubmit(async (values) =>{
        signup(values);
    });

    return (
        <div className='bg-zinc-800 max-w-md p-10 rounded-md'>
            {
                registerErrors.map((error, i) =>(
                    <div className='bg-red-500 p-2 text-white' key = {i}>
                        {error}
                    </div>
                ))
            }
            <form 
            onSubmit= {onSubmit}>
                <input type = "text" {...register('username',{required:true})} 
                    className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                    placeholder="Username"
                />
                {
                    errors.username && (
                    <p className="text-red-500">Username es requerido</p>
                )}
                <input type = "email"  {...register('email',{required:true})} 
                    className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                    placeholder="Email"
                />
                {
                    errors.email && (
                    <p className="text-red-500">Email es requerido</p>
                )}
                <input type = "password"  {...register('password',{required:true})} 
                    className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                    placeholder="Password"
                />
                {
                    errors.password && (
                    <p className="text-red-500">Password es requerido</p>
                )}
                <button type="submit">Registrar</button>
            </form>
        </div>
    )
}

export default RegisterPage