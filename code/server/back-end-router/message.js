import express from "express";
import mongoose from "mongoose";
import axios from "axios";
import querystring from "querystring";
import routeName from "#server/utils/name-route.middleware.js";

import upload from "#server/uploader.js";

const base = "messages";
const router = express.Router();

router.get(`/${base}`, routeName("msg_list"), async (req, res) => {
    const queryParams = querystring.stringify(req.query);

    let options = {
        method: "GET",
        url: `${res.locals.base_url}/api/${base}?${queryParams}`,
    };
    let result = {};
    try {
        result = await axios(options);
    } catch (_error) {}

    res.render("pages/back-end/messages/list_msg.njk", {
        list_messages: result.data,
    });
});

// Nouveau : Endpoint POST pour créer un message
router.post(`/api/${base}`, async (req, res) => {
    try {
        // Crée une nouvelle instance de Message avec les données reçues
        const message = new Message(req.body);

        // Sauvegarde dans la base de données
        await message.save();

        // Répond au client avec un message de succès
        res.status(201).json({ message: "Message envoyé avec succès !" });
    } catch (error) {
        // Gestion des erreurs
        res.status(400).json({
            error: error.message || "Une erreur s'est produite lors de l'envoi du message.",
        });
    }
});

export default router;
