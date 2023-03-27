import express from 'express'
import connectDB from './config/db.js'
import dotenv from 'dotenv'
import cors from 'cors'
import veterinarioRoutes from './routes/veterinarioRoutes.js'
import pacienteRoutes from './routes/pacienteRoutes.js'

const app = express()

app.use(express.json())                   //realizar un post de tipo json

dotenv.config()
connectDB()

const dominiosPermitidos = [process.env.FRONTEND_URL]
const corsOptions = {
    origin: function(origin, callback){
        if(dominiosPermitidos.indexOf(origin) !== -1) {
            //El origen del request esta permitido
            callback(null, true )
        }else{
            callback(new Error('No permitido por CORS'))
        }
    }
}
app.use(cors(corsOptions))
//app.use(cors({ origin: '*' }))


//Routes
app.use('/api/veterinarios',veterinarioRoutes )
app.use('/api/pacientes',pacienteRoutes )


//PORT
const PORT = process.env.PORT || 4000
app.listen(PORT)
console.log(`Server on port ${PORT} `)