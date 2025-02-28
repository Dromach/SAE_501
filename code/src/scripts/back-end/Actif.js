// Fonction pour appliquer la couleur en fonction de l'état de l'article
function applyButtonState(buttonElement, isActive) {
    buttonElement.classList.remove("active-button", "inactive-button");

    if (isActive) {
        buttonElement.textContent = "Activé";
        buttonElement.classList.add("active-button");
    } else {
        buttonElement.textContent = "Désactivé";
        buttonElement.classList.add("inactive-button");
    }
}

// Initialiser la couleur au chargement de la page
document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll(".toggle-status-button");

    // Appliquer l'état initial de chaque bouton en fonction de l'attribut 'data-is-active'
    buttons.forEach(button => {
        const isActive = button.getAttribute("data-is-active") === "true";
        applyButtonState(button, isActive);
    });
});

// Fonction pour changer l'état lors du clic
function toggleStatus(url, buttonElement) {
    fetch(url, {
        method: "POST",
    })
        .then(response => response.json())
        .then(data => {
            if (data.isActive !== undefined) {
                // Mettre à jour l'attribut data-is-active
                buttonElement.setAttribute("data-is-active", data.isActive);

                // Appliquer la nouvelle couleur en fonction de l'état
                applyButtonState(buttonElement, data.isActive);
            } else {
                console.error("Erreur: L'état de l'article n'a pas pu être récupéré");
            }
        })
        .catch(error => {
            console.error("Erreur lors de la requête:", error);
        });
}
