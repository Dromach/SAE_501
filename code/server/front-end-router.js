import express from "express";
import axios from "axios";

import routeName from "#server/utils/name-route.middleware.js";
import parseManifest from "#server/utils/parse-manifest.js";

const router = express.Router();

router.use(async (_req, res, next) => {
    const originalRender = res.render;
    res.render = async function (view, local, callback) {
        const manifest = {
            manifest: await parseManifest("frontend.manifest.json"),
        };

        const args = [view, { ...local, ...manifest }, callback];
        originalRender.apply(this, args);
    };

    next();
});

router.get("/", routeName("homepage"), async (req, res) => {
    const queryParams = new URLSearchParams(req.query).toString();
    const options = {
        method: "GET",
        url: `${res.locals.base_url}/api/articles?${queryParams}&is_active=true`,
    };
    let result = {};
    try {
        result = await axios(options);
    } catch (_error) {}

    res.render("pages/front-end/index.njk", {
        list_articles: result.data,
    });
});

// "(.html)?" makes ".html" optional in the url
router.get("/a-propos(.html)?", routeName("about"), async (_req, res) => {
    const options = {
        method: "GET",
        url: `${res.locals.base_url}/api/saes?per_page=9`,
    };

    let result = {};
    try {
        result = await axios(options);
    } catch (_error) {}

    res.render("pages/front-end/about.njk", {
        list_saes: result.data,
    });
});

router.get("/contact(.html)?", routeName("contact"), async (_req, res) => {
    res.render("pages/front-end/contact.njk", {});
});

router.get("/sur-les-medias(.html)?", routeName("media"), async (_req, res) => {
    res.render("pages/front-end/media.njk", {});
});

// ajout de la page auteur dans le router
router.get("/auteur(.html)?", routeName("auteur"), async (_req, res) => {
    res.render("pages/front-end/auteur.njk", {});
});

// ajout de la page lieux dans le router
router.get("/lieux-de-vie(.html)?", routeName("lieux"), async (_req, res) => {
    res.render("pages/front-end/lieux.njk", {});
});

router.get("/article(.html)?/:id", routeName("article"), async (req, res) => {
    const articleId = req.params.id;

    // Vérifier si la base URL est bien définie
    console.log("🔍 Base URL API :", res.locals.base_url); 

    const apiUrl = `${res.locals.base_url}/api/articles/${articleId}`;

    // Vérifier l'URL de la requête API
    console.log("🔍 Requête API vers :", apiUrl);

    try {
        const response = await axios.get(apiUrl);
        const article = response.data;

        res.render("pages/front-end/article.njk", { article });
    } catch (error) {
        console.error("❌ Erreur API :", error.response?.status, error.message);

        res.status(404).render("pages/errors/404.njk", {
            message: "Article non trouvé",
        });
    }
});

export default router;
