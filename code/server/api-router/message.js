import express from "express";

import routeName from "#server/utils/name-route.middleware.js";
import Message from "#models/message.js";

const router = express.Router();
const base = "messages";

router.post(`/${base}`, routeName("message_api"), async (req, res) => {
    const ressource = new Message(req.body);

    try {
        await ressource.save();
        res.status(201).json(ressource);
    } catch (e) {
        res.status(400).json({
            errors: [...Object.values(e?.errors).map((item) => item.message)],
        });
    }
});

export default router;
