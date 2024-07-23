'use strict' //Modo estricto

import User from './user.model.js'
import { encrypt, checkPassword, checkUpdate } from '../utils/validator.js'
import { generateJwt } from '../utils/jwt.js'

export const test = (req, res) => {
    console.log('test is running')
    return res.send({ message: 'Test is running' })
}

export const registerAdmin = async (req, res) => {
    try {
        //Capturar el formulario (body)
        let data = req.body

        //Encriptar la contraseña
        data.password = await encrypt(data.password)

        //Asignar el rol por defecto
        data.role = 'ADMIN'

        //Guardar la información en la DB
        let user = new User(data)
        await user.save() //Gardar en la DB

        //Responder al usuario
        return res.send({ message: `Registered admin successfully, can be logged with username ${user.username}`})
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error registering user', err: err })
    }
}

export const registerClient= async (req, res) => {
    try {
        //Capturar el formulario (body)
        let data = req.body

        //Encriptar la contraseña
        data.password = await encrypt(data.password)

        //Asignar el rol por defecto
        data.role = 'CLIENT'
        //Guardar la información en la DB
        let user = new User(data)

        
        await user.save() //Gardar en la DB
        //Responder al usuario
        return res.send({ message: `Registered client successfully ${user.username}`})

    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error registering user', err: err })
    }
}

export const login = async (req, res) => {
    try {
        // Capturar los datos (body)
        let data = req.body

        // Buscar usuario por nombre de usuario y correo electrónico
        let login = await User.findOne({
            $or: [
                {
                    username: data.username
                },
                {
                    email: data.email
                }
            ]
        })

        // Verificar si el usuario no existe
        if (!login) return res.status(404).send({ message: 'error validate username or email' })

        // Verificar la contraseña
        if (await checkPassword(data.password, login.password)) {
            let loggedUser = {
                uid: login._id,
                email: login.email,
                name: login.name,
                role: login.role
            }
            // Generar el token 
            let token = await generateJwt(loggedUser)
            return res.send({ message: `Welcome ${loggedUser.name}`, loggedUser, token })
        } else {
            return res.status(401).send({ message: 'Invalid password' })
        }
    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: 'Error login user', error: error })
    }
}

export const update = async (req, res) => { //Datos generales (No password)
    try {
        //Obtener el id del usuario a actualizar
        let { id } = req.params
        //Obtener los datos a actualizar
        let data = req.body
        //Validar si data trae datos
        let update = checkUpdate(data, id)
        if (!update) return res.status(400).send({ message: 'Have submitted some data that cannot be updated or missing data' })
        //Actualizar (DB)
        let updatedUser = await User.findOneAndUpdate(
            { _id: id }, 
            data, //Los datos que se van a actualizar
            { new: true } //Objeto de la DB ya actualizado
        )
        //Validar la actualización
        if (!updatedUser) return res.status(401).send({ message: 'User not found and not updated' })
        return res.send({ message: 'Updated user', updatedUser })
    } catch (err) {
        console.error(err)
        if (err.keyValue.username) return res.status(400).send({ message: `Username ${err.keyValue.username} is alredy taken` })
        return res.status(500).send({ message: 'Error updating account' })
    }
}

export const updatePassword = async(req, res) => {
    try{
        // Contraseñas 
        let data = req.body
        // ID por medio del usuario
        const userID = req.user.id
        // Existe
        let user = await User.findOne({_id: userID})
        if(!user) return res.status(404).send({message: 'User not found or not exists'})
        // Comparar password
        if(await checkPassword(data.currentPassword, user.password)){
            // Actualizar password
            data.newPassword = await encrypt(data.newPassword)
            let passwordUpdated = await User.findOneAndUpdate(
                {_id: userID},
                {password: data.newPassword},
                {new: true}
            )
            return res.send({message: 'Password updated succesfully', passwordUpdated})
        }else{
            return res.status(500).send({message: 'Wrong password'})
        }
        
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error updating password'})
    }
}

export const deleteU = async (req, res) => {
    try {
        //Obtener el Id
        let { id } = req.params
        //Eliminar (deleteOne (solo elimina no devuelve el documento) / findOneAndDelete (Me devuelve el documento eliminado))
        let deletedUser = await User.findOneAndDelete({ _id: id })
        //Verificar que se eliminó
        if (!deletedUser) return res.status(404).send({ message: 'Account not found and not deleted' })
        //Responder
        return res.send({ message: `Account with username ${deletedUser.username} deleted successfully` }) //status 200
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error deleting account', error: err })
    }
}

export const details = async (req, res) => {
    try {
        const userID = req.user.id
        // Buscar el usuario por su ID en la base de datos
        let user = await User.findById({_id: userID});
        // Verificar si el usuario existe
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }
        // Construir el objeto de respuesta con los detalles del usuario
        const userDetails = {
            _id: userID,
            name: user.name,
            surname: user.surname,
            email: user.email,
            phone: user.phone,
            username: user.username,
            role: user.role
        };
        // Enviar la respuesta con los detalles del usuario
        return res.send(userDetails);
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error getting user details' });
    }
};

export const searchUser = async (req, res) => {
    try {
        const { type } = req.body;
        if (!type) {
          return res.status(400).send({ message: 'Type is required' });
        }
      const user = await User.find({ username: type})
      if (!user || user.length === 0) {
          return res.status(404).send({ message: 'No users found' });
      }
      return res.send({ message: 'User found', user });
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error searching Users'})
    }
  }


// Admin por defecto
const defaultAdmin = {
    name: 'Josué',
    surname: 'Noj',
    username: 'jnoj',
    password: 'jnoj123',
    email: 'jnoj@gmail.com',
    phone: '40009000',
    role: 'ADMIN'
}

// Inserción de datos 
export const insertDefaultAdmin = async(req, res) =>{
    try{
        //Un único teacher por defecto
        const onceTeacher = await User.findOne({username: defaultAdmin.username})
        if(onceTeacher){
            console.log('This admin alread exists')
        }else{
            //Encryptar la contraseña
            defaultAdmin.password = await encrypt(defaultAdmin.password)
            //Crear el nuevo teacher
            const newAdmin = await User.create(defaultAdmin)
            //Responder al usuario
            console.log('A deafult admin is create')
        }
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error registering user'})
    }
}