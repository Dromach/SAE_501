import express from "express";
import mongoose from "mongoose";
import querystring from "querystring";

import routeName from "#server/utils/name-route.middleware.js";
import Message from "#models/message.js";

const router = express.Router();
const base = "messages";

router.post(`/${base}`, routeName("messages_api"), async (req, res) => {
    const { firstname, lastname, email, content, identity } = req.body;

    // Validation simple
    if (!firstname && !lastname && !email && !content) {
        return res.status(400).json({ error: "Tous les champs sont requis !" });
    }

    // Créer un nouveau message avec les données reçues
    const newMessage = new Message({
        firstname,
        lastname,
        email,
        content,
        identity,
    });

    try {
        await newMessage.save();
        res.status(201).json({ message: "Message envoyé avec succès !" });
    } catch (error) {
        res.status(500).json({ error: "Erreur serveur. Veuillez réessayer." });
    }
});

router.get(`/${base}`, routeName("messages_api"), async (req, res) => {
    const page = Math.max(1, Number(req.query.page) || 1);
    let perPage = Number(req.query.per_page) || 7;
    // Clamps the value between 1 and 20
    perPage = Math.min(Math.max(perPage, 1), 20);

    let listIds = req.query?.id;
    if (req.query.id && !Array.isArray(req.query.id)) {
        listIds = [listIds];
    }

    listIds = (listIds || [])
        .filter(mongoose.Types.ObjectId.isValid)
        .map(item => mongoose.Types.ObjectId.createFromHexString(item));

    try {
        const listRessources = await Message.aggregate([
            ...(listIds.length ? [{ $match: { _id: { $in: listIds } } }] : []),
            { $sort: { _id: -1 } },
            { $skip: Math.max(page - 1, 0) * perPage },
            { $limit: perPage },
        ]);

        const count = await Message.countDocuments(
            listIds.length ? { _id: { $in: listIds } } : null
        );

        const queryParam = { ...req.query };
        delete queryParam.page;

        res.status(200).json({
            data: listRessources,
            total_pages: Math.ceil(count / perPage),
            count,
            page,
            query_params: querystring.stringify(queryParam),
        });
    } catch (e) {
        res.status(400).json({
            errors: [
                ...Object.values(
                    e?.errors || [{ message: e?.message || "Il y a eu un problème" }]
                ).map(val => val.message),
            ],
        });
    }
});

router.get(`/${base}/:id([a-f0-9]{24})`, routeName("messages_api"), async (req, res) => {
    let listErrors = [];

    const ressource = await Message.findOne({ _id: req.params.id })
        .orFail()
        .catch(() => {
            res.status(404).json({
                errors: [...listErrors, "Élément non trouvé"],
            });
        });

    return res.status(200).json(ressource);
});

export default router;
