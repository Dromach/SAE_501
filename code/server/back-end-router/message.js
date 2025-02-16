import express from "express";
import axios from "axios";
import querystring from "querystring";
import routeName from "#server/utils/name-route.middleware.js";
import Message from "#models/message.js";

console.log("Script message chargé !");

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

router.post("/api/messages", async (req, res) => {
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

export default router;
