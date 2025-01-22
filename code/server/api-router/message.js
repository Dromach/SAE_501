import express from "express";
import querystring from "querystring";
import mongoose from "mongoose";

import routeName from "#server/utils/name-route.middleware.js";
import Message from "#models/message.js";

const router = express.Router();
const base = "messages";

router.post(`/${base}`, async (req, res) => {
    const ressource = new Message(req.body);

    try{
        await ressource.save();
        res.status(201).json(ressource);
    } catch (e) {
        res.status(400).json({
            errors: [...Object.values(e?.errors).map((item) => item.message)],
        });
    }
});

router.get(`/${base}`, routeName("message_api"), async (req, res) => {
    try {
        const listRessources = await Message.aggregate([
            { $sort: { _id: -1 } },
            { $skip: Math.max(page - 1, 0) * perPage },
            { $limit: perPage }
        ]);

        const queryParam = { ...req.query };
        delete queryParam.page;

        res.status(200).json({
            data: listRessources,
            total_pages: Math.ceil(count / perPage),
            count,
            page,
            query_params: querystring.stringify(queryParam),
        });
    } catch (e){
        res.status(400).json({
            errors: [
                ...Object.values(
                    e?.errors || [{ message: e?.message || "Il y a eu un problème"}]
                ).map(val => val.message),
            ],
        });
    }
});

router.get(`/${base}`, async (req, res) => {
    const identityEnum = ['Client', 'Admin', 'Guest']; // Exemple de tableau
    res.render('contact.njk', { identityEnum });
});

export default router;