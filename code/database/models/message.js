import mongoose, { Schema } from "mongoose";
import validator from "validator";

const messageSchema = new Schema ({
    lastname: {
        type: String,
        required: [true, "veuillez mettre un Nom de famille"],
    },
    firstname: {
        type: String,
        required: [true, "Veuillez mettre un prénom"],
    },
    email: {
        type: String,
        validate: [validator.isEmail, "E-mail incorrect"],
        required: [true, "Veuillez mettre un email"],
    },
    content: {
        type: String,
        required: [true, "Veuillez mettre un message"],
    },
    identity: {
        type: String,
        enum: ["Je ne souhaite pas le préciser", "Autre", "Étudiant / Étudiant", "Parent"],
        default: "Je ne souhaite pas le préciser",
    },
},
{
    timestamps: { createdAt: "created_at" },
});




export default mongoose.model("Message", messageSchema);

