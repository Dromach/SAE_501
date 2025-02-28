import axios from "axios";

// Fonction pour charger la date
function loadEvents() {
    const eventsContainer = document.getElementById("JPO-container");

    if (!eventsContainer) {
        console.warn("⚠️ L'élément 'JPO-container' n'est pas sur cette page.");
        return;
    }

    axios.get("http://localhost:3900/api/dateJPO.json")
        .then(response => {
            const data = response.data;
            eventsContainer.innerHTML = ""; // Efface le contenu précédent

            data.dateJPO.forEach((event) => {
                const eventHTML = `
                    <div class="event-item">
                        <p class="text-4xl mb-3">
                            ${event.DateDebut}, <br>
                            de 09H à 17H
                        </p>
                        <a class="en-savoir-plus">EN SAVOIR PLUS</a>
                    </div>
                `;
                eventsContainer.innerHTML += eventHTML;
            });
        })
        .catch(error => {
            console.error("❌ Erreur lors du chargement des événements :", error);
        });
}

// Fonction pour sauvegarder la nouvelle date
function saveDate() {
    const newDate = document.getElementById("inputDate")?.value;  

    if (!newDate) {
        alert("❌ Veuillez entrer une nouvelle date.");
        return;
    }

    axios.get("http://localhost:3900/api/dateJPO.json")
        .then(response => {
            const data = response.data;

            if (data.dateJPO.length > 0) {
                data.dateJPO[0].DateDebut = newDate;

                axios.post("http://localhost:3900/api/dateJPO", data)
                    .then(() => {
                        alert("✅ La date a été mise à jour !");
                    })
                    .catch(error => {
                        console.error("❌ Erreur lors de la sauvegarde :", error);
                    });
            }
        })
        .catch(error => {
            console.error("❌ Erreur lors de la récupération des données :", error);
        });
}

document.addEventListener("DOMContentLoaded", function () {
    if (document.getElementById("JPO-container")) {
        loadEvents(); // Page publique
    }
});

window.saveDate = saveDate;
