import {TOKEN_SECRET}from '../config.js'
import jwt from 'jsonwebtoken'

export function createAccessToken(payload){
return new Promise((resolve,reject)=>{
            //TOKEN: se utilizara para saber si ya esta llogueado y no iniciar sesion nuevamente
            jwt.sign(
                payload,
                TOKEN_SECRET,
                {
                    expiresIn: '1d',
                },
                (err, token) => {
                    if (err) reject(err);
                    resolve(token)
                    }
            );
});
}

