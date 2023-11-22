const Admin = require("../models/Admin");
const bcrypt = require("bcrypt");

const createAdmin = async (req, res) => {
    try {
        const { username, password } = req.body;

        //veirification de la requete
        if (!username || !password) {
            return res.status(400).json({ message: 'Veuillez fournir un nom d\'utilisateur et un mot de passe.' });
        }

        // hash du mot de passe
        const hashedPassword = await bcrypt.hash(password, 10)

        // creation du compte
        const newAccount = await Admin.create({
            username,
            password: hashedPassword
        });

        res.status(200).json({
            message: 'Operation successful',
            admin: {
                username: newAccount.username,
                created: newAccount.created,
            },
        });
    } catch (err) {
        console.error({ message: "Operation failed", error: err.message });
    }
}

const loginAdmin = async (req, res) => {
    try {
        const { username, password } = req.body;

        //veirification de la requete
        if (!username || !password) {
            return res.status(400).json({ message: 'Veuillez fournir un nom d\'utilisateur et un mot de passe.' });
        }

        // recherche de l'Admin par le username
        const check = await Admin.findOne({ where: { username: username } });

        if(!check){
            return res.status(403).json({ message: 'Operation failed', error: "username not found" });
        }

        if (check.disabled === 1) {
            return res.status(403).json({ message: 'Operation failed"', error: "Vous avez été désactivé." });
        }

        //verification du password
        const compare = await bcrypt.compare(password, check.password);

        if (!compare) {
            return res.status(401).json({ message: 'Mot de passe erroné.' });
        }

        // Authentification réussie
        res.status(200).json({ message: 'Operation successful', session: true });
    } catch (err) {
        console.error({ message: "Operation failed", error: err.message });
    }
}

module.exports = { createAdmin, loginAdmin };