import validator from "validator";
import axios from "axios";

const submitForm = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const formValues = Object.fromEntries(formData);
    console.log("Données du formulaire :", formValues);

    if (validator.isEmpty(formValues.firstname.trim())) {
        document.querySelector("[data-error-message='firstname']").classList.remove("hidden");
        // display error message
        return;
    };
    if (validator.isEmpty(formValues.lastname.trim())) {
        document.querySelector("[data-error-message='lastname']").classList.remove("hidden");
        // display error message
        return;
    };
    if (validator.isEmpty(formValues.email.trim())) {
        document.querySelector("[data-error-message='email']").classList.remove("hidden");
        // display error message
        return;
    };
    if (validator.isEmpty(formValues.content.trim())) {
        document.querySelector("[data-error-message='content']").classList.remove("hidden");
        // display error message
        return;
    };
    
    try {
        const response = await axios.post("http://localhost:3900/api/messages", formValues, {
            headers: { "Content-Type": "application/json" },
        });
        e.target.reset();
    } catch (error) { 
        console.error("❌ Erreur lors de l'envoi :", error.response ? error.response.data : error.message);
    }
};

document.querySelectorAll("[data-async-form]").forEach((item) => {
    item.addEventListener("submit", submitForm);
});

// SERT A ANNULER LE RELOAD DE LA PAGE POUR LE FORMULAIRE
