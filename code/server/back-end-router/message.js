import express from "express";
import axios from "axios";
import querystring from "querystring";
import routeName from "#server/utils/name-route.middleware.js";

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

export default router;
