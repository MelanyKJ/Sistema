//PROCESA PETICIONES AUTH CONTROLLER
import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import {createAccessToken} from '../libs/jwt.js'

export const register = async (req, res) => {
    const{email,password,username} =req.body

    try {

        //VALIDACION DE USUARIO
        const userFound = await User.findOne({email})
        if(userFound) return res.status(400).json(['El correo ya existe']);


        //ENCRYPTAR
        //se pasa la contraseña y el 10 la vez que se ejecutara el alagoritmo
        const passwordHash= await bcrypt.hash(password,10)
        const newUser = new User({
            username,
            email,
            password:passwordHash
        });
        
        //primero guarda el usuario, se crea el token, estable la cookie en 
        //una respuesta y envia la respuesta
        const userSaved=await newUser.save();
        const token = await createAccessToken({id:userSaved._id})
        res.cookie('token', token);

        //userSaved para que me devuelva todos los datos del usuario res.json(userSaved)
        //para que no envie la contraseña encriptada se modifico
        res.json({
            id:userSaved._id,
            username:userSaved.username,
            email:userSaved.email,
            createAt:userSaved.createdAt,
            updatedAt:userSaved.updatedAt,

        });

    } catch (error) {
        res.status(500).json({message:error});
    }

};

export const login = async (req, res) => {
    const{email,password} =req.body;

    try {
        //VERIFICAR  SI EL USUARIO EXISTE, 
        //va a buscar  el usuario por el email

        const userFound = await User.findOne({email});
        if(!userFound) return res.status(400).json({message:"Usuario no encontrado"});

        //ENCRYPTAR
        //se pasa la contraseña y el 10 la vez que se ejecutara el alagoritmo
        const isMatch= await bcrypt.compare(password,userFound.password);
        if(!isMatch) return res.status(400).json({message:"Contraseña incorrecta"});


        const token = await createAccessToken({id:userFound._id});
        res.cookie('token', token);

        //userSaved para que me devuelva todos los datos del usuario res.json(userSaved)
        //para que no envie la contraseña encriptada se modifico
        res.json({
            id:userFound._id,
            username:userFound.username,
            email:userFound.email,
            createAt:userFound.createdAt,
            updatedAt:userFound.updatedAt,

        });

    } catch (error) {
        res.status(500).json({message:error});
    }

};

export const  logout = (req, res) => {  
    res.cookie('token',"",{
        expires: new Date(0)
    })
    return res.sendStatus(200);
 };

 export const profile =async (req,res)=>{
   const userFound = await User.findById(req.user.id)
   if(!userFound)  return res.status(404).json({message:"Usuario no encontrado"});
   return res.json({
    id:userFound._id,
    username:userFound.username,
    email:userFound.email,
    createAt:userFound.createdAt,
    updatedAt:userFound.updatedAt,

   })

    res.send('profile')
 }

