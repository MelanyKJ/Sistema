//SIRVE PARA VALIDAR QUE EL USUARIO ESTE LOGUEADO
import jwt  from 'jsonwebtoken';
import { TOKEN_SECRET} from '../config.js';

//El primer parametro info de la peticion,metodos para enviar una respues y 
//en lugar que retorne una respuesta al cliente le dira continua 
export const authRequired =  (req, res, next) => {
    const {token} =req.cookies;
    if(!token)
        return res.status(401).json({message:"Autorizacion denegada, no token"});
        
        jwt.verify(token, TOKEN_SECRET, (err,user)=>{
            if(err)
                return res.status(403).json({message:"Token invalido"});

            //DEL USUARIO QUE SE ESTA DECOFICANDO SE ESTARA GUARDARON EN REQ.USER
            //YA QUE TODAS LAS RUTAS TIENE EL REQ (REQUEST)
                req.user =user
                
                next();
            
        })
};
