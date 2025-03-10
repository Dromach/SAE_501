import express from "express";

import SAERouter from "./sae.js";
import ArticleRouter from "./article.js";
import AuthorRouter from "./author.js";
import ArticleCommentRouter from "./comment-article.js";
import MessageRouter from "./message.js";
import DiversRouter from "./divers.js";

import path from "path";
import { fileURLToPath } from "url";


const router = express.Router();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "src")));

router.use(SAERouter);
router.use(ArticleRouter);
router.use(AuthorRouter);
router.use(ArticleCommentRouter);
router.use(MessageRouter);
router.use(DiversRouter);
router.all("*", (req, res) => {
    res.status(404).json({
        errors: [
            `La route "${req.path}" n'existe pas`,
        ],
    });
});

export default router;
