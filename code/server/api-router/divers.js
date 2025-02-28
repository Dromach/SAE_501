import express from "express";
import fs from "fs";
import path from "path";

const router = express.Router();

// Lire le fichier dateJPO.json
router.get("/dateJPO.json", (req, res) => {
    // Le chemin du fichier JSON, en tenant compte de la structure du projet
    const filePath = path.join(__dirname, "src", "data", "dateJPO.json");

    fs.readFile(filePath, "utf8", (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Erreur lors de la lecture du fichier JSON." });
        }
        try {
            const jsonData = JSON.parse(data); // Parser les données JSON
            res.json(jsonData); // Renvoi des données au frontend
        } catch (parseError) {
            res.status(400).json({ error: "Erreur de parsing du fichier JSON." });
        }
    });
});

// Sauvegarder les données modifiées dans le fichier dateJPO.json
router.post("/dateJPO", (req, res) => {
    const filePath = path.join(__dirname, "src", "data", "dateJPO.json");
    const updatedData = req.body; // Les données envoyées depuis le frontend

    // Vérification de la structure des données envoyées
    if (!updatedData || !updatedData.dateJPO) {
        return res.status(400).json({ error: "Données invalides." });
    }

    fs.writeFile(filePath, JSON.stringify(updatedData, null, 2), (err) => {
        if (err) {
            return res.status(500).json({ error: "Erreur lors de l'écriture du fichier JSON." });
        }
        res.json({ message: "Données mises à jour avec succès." });
    });
});

export default router;
