import express from "express";
import Article from "#models/article.js"; // Modèle de l'article

const router = express.Router();

// Route pour afficher un article
router.get("/article/:id", async (req, res) => {
    try {
        // On récupère l'article correspondant à l'ID
        const article = await Article.findById(req.params.id);
        if (!article) {
            return res.status(404).send("Article non trouvé");
        }

        // Rendu de la page avec l'article
        res.render("article.njk", { article });
    } catch (error) {
        console.error("Erreur lors de la récupération de l'article :", error);
        res.status(500).send("Erreur serveur");
    }
});

export default router;
