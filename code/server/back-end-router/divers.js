import express from "express";
import routeName from "#server/utils/name-route.middleware.js";

const base = "divers";
const router = express.Router();

router.get(`/${base}`, routeName("divers"), async (req, res) => {
    res.render("pages/back-end/divers/list.njk", {});
});

export default router;
