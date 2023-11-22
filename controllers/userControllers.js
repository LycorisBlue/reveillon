const User = require('../models/User');
const Code = require('../models/Code');
const crypto = require('crypto');
const bcrypt = require("bcrypt");


const createUser = async (req, res) => {
    try {
        const { uiid, name, lastname, email, password, civility, contact } = req.body;

        // Vérifie que tous les champs requis sont fournis
        if (!uiid || !name || !lastname || !email || !password || !civility || !contact) {
            return res.status(400).json({ message: 'Veuillez fournir toutes les informations nécessaires pour créer un utilisateur.' });
        }
        // Vérifie si l'UIID existe dans le modèle Code
        const existingCode = await Code.findOne({
            where: { uiid: uiid },
        });

        const existingEmail = await User.findOne({
            where: { email: email },
        });

        const existingUiid = await User.findOne({
            where: { uiid: uiid },
        });

        // Si l'UIID n'est pas trouvé ou a un statut différent de 0
        if (!existingCode) {
            return res.status(404).json({ message: 'UIID introuvable' });
        }

        if (existingUiid) {
            return res.status(404).json({ message: 'UIID deja utiliser' });
        }

        if (existingEmail) {
            return res.status(404).json({ message: 'Email deja utiliser' });
        }



        if (existingCode.status == 0) {
            return res.status(404).json({ message: 'Vous ne pouvez pas utilisez ce UIID.' });
        }

        // Hache le mot de passe
        const hashedPassword = await bcrypt.hash(password, 10);
        const dataqr = crypto.randomBytes(200).toString('hex');
        const datagift = crypto.randomBytes(5).toString('hex');

        // Crée un nouvel utilisateur dans la base de données
        const newUser = await User.create({
            uiid,
            name,
            lastname,
            email,
            password: hashedPassword,
            civility,
            contact,
            qrcode: dataqr,
            gift: 'M-' + datagift,
        });

        const allUsers = await User.findAll();

        if (allUsers.length % 2 == 0) {
            const user1 = allUsers[allUsers.length - 2];
            const user2 = allUsers[allUsers.length - 1];

            user1.notgift = user2.gift;
            user2.notgift = user1.gift;

            await user1.save();
            await user2.save();
        }

        res.status(201).json({ message: 'Operation successful', user: newUser, length: allUsers.length});
    } catch (error) {
        console.error('Erreur lors de la création de l\'utilisateur :', error);
        res.status(500).json({ message: 'Erreur serveur lors de la création de l\'utilisateur.' });
    }
}

const findByBody = async (req, res) => {
    try {
        const { uiid, qrcode, email, contact } = req.body;

        // Vérifie que soit uiid, soit qrcode est fourni
        if (!uiid && !qrcode && !email && !contact) {
            return res.status(400).json({ message: 'Veuillez fournir un attribut dans le body' });
        }

        let user;

        // Recherche l'utilisateur en fonction de ce qui est fourni (uiid ou qrcode)
        if (uiid) {
            user = await User.findOne({ where: { uiid: uiid } });
        } else if (qrcode) {
            user = await User.findOne({ where: { qrcode: qrcode } });
        } else if (email) {
            user = await User.findOne({ where: { email: email } });
        } else if (contact) {
            user = await User.findOne({ where: { contact: contact } });
        }

        // Si l'utilisateur n'est pas trouvé
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur introuvable.' });
        }

        res.status(200).json({ message: 'Operation successful', user });
    } catch (error) {
        console.error('Erreur lors de la récupération des informations utilisateur :', error);
        res.status(500).json({ message: 'Erreur serveur lors de la récupération des informations utilisateur.' });
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        //veirification de la requete
        if (!email || !password) {
            return res.status(400).json({ message: 'Veuillez fournir un nom d\'utilisateur et un mot de passe.' });
        }

        // recherche de l'Admin par le username
        const check = await User.findOne({ where: { email: email } });

        if (!check) {
            return res.status(403).json({ message: 'Operation failed', error: "email not found" });
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

module.exports = { createUser, findByBody, loginUser };