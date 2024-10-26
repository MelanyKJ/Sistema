import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';


function LoginPage() {

  const {
    register,
    handleSubmit,
    formState: { errors },
   } = useForm();
   useAuth();
   const {signin, errors: signinErrors} = useAuth();

  const onSubmit = handleSubmit((data) => {
    signin(data);
  })
  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center">
                  {
                signinErrors.map((error, i) =>(
                    <div className='bg-red-500 p-2 text-white' key = {i}>
                        {error}
                    </div>
                ))
            }
      <div className='bg-zinc-800 max-w-md w-full p-10 rounded-md'>
        <h1 className="text-2xl font-bold">Login</h1>
        <form
          onSubmit={onSubmit}>
          <input type="email"  {...register('email', { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Email"
          />
          {
            errors.email && (
              <p className="text-red-500">Email es requerido</p>
            )}
          <input type="password"  {...register('password', { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Password"
          />
          {
            errors.password && (
              <p className="text-red-500">Password es requerido</p>
            )}
          <button type="submit">Ingresar</button>
        </form>
      </div>
    </div>
  )
}

export default LoginPage