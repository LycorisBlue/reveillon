const Admin = require("../models/Admin");
const Code = require("../models/Code");



const admin = async (req, res) => {
	try {
		// Récupère tous les administrateurs de la base de données
		const allAdmins = await Admin.findAll();

		res.status(200).json({ message: "Operation successful", admins: allAdmins });
	} catch (error) {
		console.error('Erreur lors de la récupération de tous les admins :', error);
		res.status(500).json({ message: 'Erreur serveur lors de la récupération des admins.' });
	}
}

const code = async (req, res) => {
	try {
		// Récupère tous les Codes de la base de données
		const allCodes = await Code.findAll();

		res.status(200).json({ message: "Operation successful", admins: allCodes });
	} catch (error) {
		console.error('Erreur lors de la récupération de tous les admins :', error);
		res.status(500).json({ message: 'Erreur serveur lors de la récupération des admins.' });
	}
}

module.exports = { admin, code };