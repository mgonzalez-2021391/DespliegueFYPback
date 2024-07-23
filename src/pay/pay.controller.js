'use strict'

import Pay from './pay.model.js'

export const createPay = async (req, res) => {
    try {
        let data = req.body
        let pay = new Pay(data)
        await pay.save()
        return res.send({ message: 'Pago creado correctamente', pay })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error creando el pago', err })
    }
}

export const updatePay = async (req, res) => {
    try {
        let { id } = req.params
        let data = req.body
        let updatedPay = await Pay.findByIdAndUpdate(id, data, { new: true })
        if (!updatedPay) return res.status(404).send({ message: 'Pago no encontrado' })
        return res.send({ message: 'Pago actualizado', updatedPay })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error actualizando el pago', err })
    }
}

export const getPayById = async (req, res) => {
    try {
        let { id } = req.params
        let pay = await Pay.findById(id).populate('user')
        if (!pay) return res.status(404).send({ message: 'Pago no encontrado' })
        return res.send({ message: 'Detalles del pago', pay })
    } catch (err) {
        console.error(`Error obteniendo el pago: ${err.message}`)
        return res.status(500).send({ message: 'Error obteniendo el pago', err: err.message })
    }
}

export const deletePay = async (req, res) => {
    try {
        let { id } = req.params
        let deletedPay = await Pay.findByIdAndDelete(id)
        if (!deletedPay) return res.status(404).send({ message: 'Pago no encontrado' })
        return res.send({ message: 'Pago eliminado', deletedPay })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error eliminando el pago', err })
    }
}
