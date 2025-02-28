import express from "express";
import Article from "#models/article.js";

const router = express.Router();

router.get("/article/:id", async (req, res) => {
    try {
        const article = await Article.findById(req.params.id);
        if (!article) {
            return res.status(404).send("Article non trouvé");
        }

        res.render("article.njk", { article });
    } catch (error) {
        console.error("Erreur lors de la récupération de l'article :", error);
        res.status(500).send("Erreur serveur");
    }
});

export default router;
