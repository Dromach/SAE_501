import express from "express";
// import mongoose from "mongoose";
import axios from "axios";
import querystring from "querystring";
import routeName from "#server/utils/name-route.middleware.js";

// import upload from "#server/uploader.js";

const base = "divers";
const router = express.Router();

// Get or create SAE
router.get(`/${base}`, routeName("divers"), async (req, res) => {
    const queryParams = querystring.stringify(req.query);

    let options = {
        method: "GET",
        url: `${res.locals.base_url}/api/${base}?${queryParams}`,
    };
    let result = {};
    try {
        result = await axios(options);
    } catch (_error) {}

    res.render("pages/back-end/divers/list.njk", {
        list_message: result.data,
    });
});



export default router;
