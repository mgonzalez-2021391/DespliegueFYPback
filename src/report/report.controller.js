import Report from './report.model.js';
import User from '../user/user.model.js';

export const createReport = async (req, res) => {
    try {
        let data = req.body;
        data.user = req.user._id; // Asignar el usuario autenticado al campo user
        let report = new Report(data);
        await report.save();
        return res.send({ message: 'Reporte creado correctamente', report });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error creando el reporte', err });
    }
};

export const updateReport = async (req, res) => {
    try {
        let { id } = req.params;
        let data = req.body;
        let updatedReport = await Report.findByIdAndUpdate(id, data, { new: true });
        if (!updatedReport) return res.status(404).send({ message: 'Reporte no encontrado' });
        return res.send({ message: 'Reporte actualizado', updatedReport });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error actualizando el reporte', err });
    }
};

export const getReportById = async (req, res) => {
    try {
        const { id } = req.params;
        let report = await Report.findById(id).lean(); // Use lean to get a plain JavaScript object
        if (!report) return res.status(404).send({ message: 'Reporte no encontrado' });

        const user = await User.findById(report.user, 'name'); // Find the user by ID and get only the name field
        report.user = user ? { _id: user._id, name: user.name } : null; // Replace the user ID with the user object containing name

        return res.send({ message: 'Detalles del reporte', report });
    } catch (err) {
        console.error(`Error obteniendo el reporte: ${err.message}`);
        return res.status(500).send({ message: 'Error obteniendo el reporte', err: err.message });
    }
};


export const deleteReport = async (req, res) => {
    try {
        let { id } = req.params;
        let deletedReport = await Report.findByIdAndDelete(id);
        if (!deletedReport) return res.status(404).send({ message: 'Reporte no encontrado' });
        return res.send({ message: 'Reporte eliminado', deletedReport });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error eliminando el reporte', err });
    }
};

export const getAllReports = async (req, res) => {
    try {
        let reports = await Report.find().lean(); // Use lean to get plain JavaScript objects
        if (!reports) return res.status(404).send({ message: 'No se encontraron reportes' });

        const userIds = reports.map(report => report.user);
        const users = await User.find({ _id: { $in: userIds } }, 'name'); // Find all users by their IDs and get only the name fields
        const userMap = users.reduce((acc, user) => {
            acc[user._id] = user.name;
            return acc;
        }, {});

        reports = reports.map(report => ({
            ...report,
            user: { _id: report.user, name: userMap[report.user] || null } // Replace the user ID with the user object containing name
        }));

        return res.send({ message: 'Reportes encontrados:', reports });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error obteniendo los reportes', err });
    }
};
