'use strict'

//Importaciones
import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import cors from 'cors'
import { config } from 'dotenv'
import userRoutes from '../src/user/user.routes.js'
import categoryRoutes from '../src/category/category.routes.js'
import publicationRoutes from '../src/publication/publication.routes.js'
import commentRoutes from '../src/comment/comment.routes.js'
import petRoutes from '../src/pet/pet.routes.js'
import vetRoutes from '../src/vet/vet.routes.js'
import veterinaryRoutes from '../src/veterinary/veterinary.routes.js'
import veterinaryAppoinmentRoutes from '../src/veterinaryAppointment/veterinaryAppoinment.routes.js' 
import adoptionAppointmentRoutes from '../src/adoptionAppointment/adoptionAppointment.routes.js'
import reportRoutes from '../src/report/report.routes.js'


const app = express()
config()
const port = process.env.PORT || 3056

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())
app.use(helmet())
app.use(morgan('dev'))

//declaraciones de rutas 
app.use('/fyp/user', userRoutes)
app.use('/fyp/category', categoryRoutes)
app.use('/fyp/publication', publicationRoutes)
app.use('/fyp/comment', commentRoutes)
app.use('/fyp/pet', petRoutes)
app.use('/fyp/vet', vetRoutes)
app.use('/fyp/veterinary', veterinaryRoutes)
app.use('/fyp/veterinaryAppoinment', veterinaryAppoinmentRoutes)
app.use('/fyp/adoptionAppointment', adoptionAppointmentRoutes)
app.use('/fyp/report', reportRoutes)


export const initServer = () => {
    app.listen(port)
    console.log(`Server HTTP running in port ${port}`)
}