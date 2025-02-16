import express from "express";

import routeName from "#server/utils/name-route.middleware.js";
import Message from "#models/message.js";

const router = express.Router();
const base = "messages";

router.post(`/${base}`, routeName("message_api"), async (req, res) => {
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
        // Sauvegarder le message dans MongoDB
        await newMessage.save();
        res.status(201).json({ message: "Message envoyé avec succès !" });
    } catch (error) {
        res.status(500).json({ error: "Erreur serveur. Veuillez réessayer." });
    }
});

router.get(`/${base}`, routeName("message_api"), async (req, res) => {
});

export default router;
