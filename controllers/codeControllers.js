const Admin = require("../models/Admin");
const Code = require("../models/Code");
const bcrypt = require("bcrypt");
const crypto = require('crypto');

const createCode = async (req, res) => {
    try {
      const { creator, password } = req.body;
  
        //veirification de la requete
        if (!creator || !password) {
            return res.status(400).json({ message: 'Veuillez fournir un nom d\'utilisateur et un mot de passe.' });
        }

        // recherche de l'Admin par le username
        const check = await Admin.findOne({ where: { username: creator } });

        if(!check){
            return res.status(403).json({ message: 'Operation failed', error: "username not found" });
        }

        if (check.disabled === 1) {
            return res.status(403).json({ message: 'Operation failed', error: "Vous ne pouvez pas crée de code" });
        }

        //verification du password
        const compare = await bcrypt.compare(password, check.password);

        if (!compare) {
            return res.status(401).json({ message: 'Mot de passe erroné.' });
        }
  
      // Génère l'UIID aléatoire
      const uiid = crypto.randomBytes(10).toString('hex');
  
      // Crée le nouveau code
      const newCode = await Code.create({
        uiid: uiid,
        creator: check.username,
      });
  
      res.status(201).json({ message: 'Operation successful', code: newCode.uiid });
    } catch (error) {
      console.error('Erreur lors de la génération du code :', error);
      res.status(500).json({ message: 'Erreur serveur lors de la génération du code.' });
    }
  }

const blockCode = async (req, res) => {
    try {
      const { creator, password, uiid } = req.body;
  
      // Vérifie que le créateur, le mot de passe et l'UIID sont fournis
      if (!creator || !password || !uiid) {
        return res.status(400).json({ message: 'Operation failed', error: 'Veuillez fournir le créateur, le mot de passe et l\'UIID.' });
      }

    // recherche de l'Admin par le username
    const check = await Admin.findOne({ where: { username: creator } });

    if(!check){
        return res.status(403).json({ message: 'Operation failed', error: "username not found" });
    }

    if (check.disabled === 1) {
        return res.status(403).json({ message: 'Operation failed"', error: "Vous avez été désactivé." });
    }

    //verification du password
    const compare = await bcrypt.compare(password, check.password);

    if (!compare) {
        return res.status(401).json({message: 'Operation failed', error: 'Mot de passe erroné.' });
    }
  
      // Change la valeur du statut en 0 selon l'UIID
      const updatedCode = await Code.update(
        { status: 0 },
        { where: { uiid: uiid } }
      );
  
      // Vérifie si le code a été trouvé et mis à jour
      if (updatedCode[0] === 0) {
        return res.status(404).json({ message: 'Operation failed', error: 'Code introuvable ou impossible à désactiver.'});
      }
  
      res.status(200).json({ message: 'Statut du code changé avec succès.' });
    } catch (error) {
      console.error('Erreur lors du changement de statut du code :', error);
      res.status(500).json({ message: 'Erreur serveur lors du changement de statut du code.' });
    }
  }


module.exports = { createCode, blockCode};
