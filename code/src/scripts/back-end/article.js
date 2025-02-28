import express from "express";
import axios from "axios";
import mongoose from "mongoose";
import querystring from "querystring";

import upload from "server/uploader.js";

const base = "articles";
const router = express.Router();

// Get multiple articles
router.get(`/${base}`, async (req, res) => {
    const queryParams = querystring.stringify(req.query);
    const options = {
        method: "GET",
        url: `${res.locals.base_url}/api/${base}?${queryParams}`,
    };

    let result = {};
    try {
        result = await axios(options);
    } catch (_error) {}

    res.render("pages/back-end/articles/list.njk", {
        list_articles: result.data,
    });
});

// Get or create article
router.get([`/${base}/:id`, `/${base}/add`], async (req, res) => {
    const isEdit = req.params.id !== "add";

    let result = {};
    let listErrors = [];
    let listAuthors = [];

    try {
        if (isEdit) {
            const options = {
                method: "GET",
                url: `${res.locals.base_url}/api/${base}/${req.params.id}`,
            };
            result = await axios(options);
        }

        listAuthors = await axios({
            method: "GET",
            url: `${res.locals.base_url}/api/authors`,
        });
        listAuthors = listAuthors.data.data;
    } catch (error) {
        listErrors = error.response.data.errors;
    }

    res.render("pages/back-end/articles/add-edit.njk", {
        article: result.data || {},
        list_errors: listErrors,
        list_authors: listAuthors,
    });
});

export default router;
