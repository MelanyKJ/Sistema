import z from  'zod';
//VALIDACIONES DE DATA
export const registerSchema = z.object({
    username: z.string({
        required_error: 'Usuario es requerido',
    }),
    email:z.string({
        required_error: 'Correo es requerido',
    }).email({
        invalid_type_error: 'Correo no es válido',
    }),
    password: z.string({
        required_error: 'Contraseña como minimo es de 6 caracteres',
    }),
});

export const loginSchema = z.object({
    email:z.string({
        required_error: 'Correo es requerido',
    }).email({
        invalid_type_error: 'Correo no es válido',
    }),
    password: z.string({
        required_error: 'Contraseña es requerido',
    }).min(6,{
        message: 'Contraseña como minimo es de 6 caracteres',
    }),
});