'use strict'

import Bill from './bill.model.js'

export const createBill = async (req, res) => {
    try {
        let data = req.body
        let bill = new Bill(data)
        await bill.save()
        return res.send({ message: 'Factura creada correctamente', bill })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error creando la factura', err })
    }
}

export const updateBill = async (req, res) => {
    try {
        let { id } = req.params
        let data = req.body
        let updatedBill = await Bill.findByIdAndUpdate(id, data, { new: true }).populate('pay')
        if (!updatedBill) return res.status(404).send({ message: 'Factura no encontrada' })
        return res.send({ message: 'Factura actualizada', updatedBill })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error actualizando la factura', err })
    }
}

export const getBillById = async (req, res) => {
    try {
        let { id } = req.params
        let bill = await Bill.findById(id).populate('pay')
        if (!bill) return res.status(404).send({ message: 'Factura no encontrada' })
        return res.send({ message: 'Detalles de la factura', bill })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error obteniendo la factura', err })
    }
}

export const deleteBill = async (req, res) => {
    try {
        let { id } = req.params
        let deletedBill = await Bill.findByIdAndDelete(id)
        if (!deletedBill) return res.status(404).send({ message: 'Factura no encontrada' })
        return res.send({ message: 'Factura eliminada', deletedBill })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error eliminando la factura', err })
    }
}