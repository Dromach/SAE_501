import axios from 'axios';

// ✅ Fonction pour charger la date (utilisée sur la page publique)
function loadEvents() {
    const eventsContainer = document.getElementById("JPO-container");

    if (!eventsContainer) {
        console.warn("⚠️ L'élément 'JPO-container' n'est pas sur cette page.");
        return;
    }

    console.log("✅ Chargement des événements...");
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

// ✅ Fonction pour sauvegarder la nouvelle date (utilisée dans l'admin)
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
                        console.log("✅ Date modifiée avec succès.");
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

// ✅ Exécuter loadEvents() SEULEMENT si on est sur la page affichant la date
document.addEventListener("DOMContentLoaded", function() {
    console.log("✅ DOM chargé.");

    if (document.getElementById("JPO-container")) {
        loadEvents();  // Page publique
    }

    if (document.getElementById("inputDate")) {
        console.log("✅ Page Admin détectée.");
    }
});

// ✅ Rendre `saveDate` accessible dans le panel admin
window.saveDate = saveDate;
