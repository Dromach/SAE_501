import express from "express";
import fs from "fs";
import path from "path";

// Fonction pour obtenir le répertoire de travail actuel dans un module ES
const __dirname = path.dirname(new URL(import.meta.url).pathname);

const router = express.Router();

// Lire le fichier dateJPO.json
router.get("/dateJPO.json", (req, res) => {
    // Résoudre correctement le chemin vers le fichier JSON en utilisant __dirname
    const filePath = path.join(__dirname, "..", "..", "src", "data", "dateJPO.json");
    
    // Vérification du chemin généré (si nécessaire, remplacez le backslash initial)
    const correctFilePath = filePath.startsWith("\\") ? filePath.substring(1) : filePath;

    // Vérifiez si le fichier existe avant de tenter de le lire
    fs.access(correctFilePath, fs.constants.F_OK, (err) => {
        if (err) {
            return res.status(404).json({ error: `Fichier non trouvé à ${correctFilePath}` });
        }

        // Lecture du fichier JSON
        fs.readFile(correctFilePath, "utf8", (err, data) => {
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
});

// Sauvegarder les données modifiées dans le fichier dateJPO.json
router.post("/dateJPO", (req, res) => {
    const filePath = path.join(__dirname, "..", "..", "src", "data", "dateJPO.json");
    
    // Vérification du chemin généré
    const correctFilePath = filePath.startsWith("\\") ? filePath.substring(1) : filePath;

    const updatedData = req.body;

    // Vérification de la structure des données envoyées
    if (!updatedData || !updatedData.dateJPO) {
        return res.status(400).json({ error: "Données invalides." });
    }

    // Vérifiez si le fichier existe avant de tenter d'écrire
    fs.access(correctFilePath, fs.constants.F_OK, (err) => {
        if (err) {
            return res.status(404).json({ error: `Fichier non trouvé à ${correctFilePath}` });
        }

        // Écrire les données mises à jour dans le fichier JSON
        fs.writeFile(correctFilePath, JSON.stringify(updatedData, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ error: "Erreur lors de l'écriture du fichier JSON." });
            }
            res.json({ message: "Données mises à jour avec succès." });
        });
    });
});

export default router;
