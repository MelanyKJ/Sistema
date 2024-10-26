//UTILIZA TODO INDEX.JS ARRANCA EL SERVIDOR
import app from './app.js'
import { connectDB } from './db.js'

connectDB();
app.listen(4000)
console.log('Escuchando en el puerto',4000)