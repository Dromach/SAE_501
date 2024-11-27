import validator from "validator"; 

const submitForm = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const formValues = Object.fromEntries(formData);

    if (valdiator.isEmpty(formValues.lastname.trim())) {
        document.querySelector("[data-error-message='lastname']").classList.remove("hidden");
    //display error message
    return;
    };

}

document.querySelectorAll("[data-async-form]").forEach((item) => {
    item.addEventListener("submit", submitForm)

});

//SERT A ANNULER LE RELOAD DE LA PAGE POUR LE FORMULAIRE 