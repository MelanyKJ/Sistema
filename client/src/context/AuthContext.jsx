import { createContext, useState, useContext } from "react";
import { registerRequest, loginRequest } from "../api/auth";


export const AuthContext =  createContext();

//HOOK
export const useAuth = () =>{
    const context = useContext(AuthContext);
    if(!context){
        throw new Error('useAuth debe usarse dentro de un AuthProvider')
    }
    return context;
};

//PROVIDER, COMPONENTE QUE VA A ENGLOBAR A OTRO
export const AuthProvider = ({children}) => {
    const [user,setUser]  = useState(null);

    //AUTENTICACION DE USUARIO
    const [isAuthenticated, setAuthenticated] = useState(false);

    //
    const [errors, setErrors] =useState([]);

    const signup = async (user) =>{
        try {
            const res = await registerRequest(user);
            console.log(res.data);
            setUser(res.data);
            setAuthenticated(true);
        } catch (error) {
            console.error(error.response);
            setErrors(error.response.data);
        }
    };

    const signin = async (user) =>{
        try {
            const res =  await loginRequest(user);
            console.log(res);
        } catch (error) {
            setErrors(error.response.data)
        }
    }

    return(
        <AuthContext.Provider 
        value={{
            signup,
            signin,
            user,
            isAuthenticated,
            errors,

        }}>
            {children}
        </AuthContext.Provider>
    );
};

