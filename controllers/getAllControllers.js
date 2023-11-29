const Admin = require("../models/Admin");
const Code = require("../models/Code");
const User = require("../models/User");




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

		res.status(200).json({ message: "Operation successful", codes: allCodes });
	} catch (error) {
		console.error('Erreur lors de la récupération de tous les codes :', error);
		res.status(500).json({ message: 'Erreur serveur lors de la récupération des codes.' });
	}
}

const user = async (req, res) => {
	try {
		// Récupère tous les Codes de la base de données
		const allUsers = await User.findAll();

		res.status(200).json({ message: "Operation successful", users: allUsers });
	} catch (error) {
		console.error('Erreur lors de la récupération de tous les utilisateurs :', error);
		res.status(500).json({ message: 'Erreur serveur lors de la récupération des utilisateurs.' });
	}
}

module.exports = { admin, code, user };