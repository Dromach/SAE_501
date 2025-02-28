import axios from 'axios';

console.log();

// Fonction pour charger les événements
function loadEvents() {
    axios.get("http://localhost:3900/dateJPO") // Récupère les événements
        .then(response => {
            const data = response.data;
            const eventsContainer = document.getElementById("JPO-container");
            eventsContainer.innerHTML = ""; // Efface le contenu précédent

            // Affiche chaque événement
            data.dateJPO.forEach((event, index) => {
                const eventHTML = `
                    <div class="event-item">
                        <p class="text-4xl mb-3">
                            ${event.DateDebut}, <br>
                            de ${event.HeureDebut} à ${event.HeureFin}
                        </p>
                        <a class="en-savoir-plus" href="#" onclick="editEvent(${index})">EN SAVOIR PLUS</a>
                    </div>
                `;
                eventsContainer.innerHTML += eventHTML;
            });
        })
        .catch(error => {
            console.error("Erreur lors du chargement des événements", error);
        });
}

// Fonction pour éditer une date
function editEvent(index) {
    const newDate = document.getElementById("inputDate").value;  // Récupère la nouvelle date de l'input

    if (!newDate) {
        alert("Veuillez entrer une nouvelle date.");
        return;
    }

    axios.get("http://localhost:3900/dateJPO") // Récupère les événements du serveur
        .then(response => {
            const data = response.data;
            console.log("Données actuelles dans dateJPO.json:", data);

            if (data.dateJPO.length > 0) {
                // Modifier la date de début de l'événement sélectionné
                data.dateJPO[index].DateDebut = newDate;
                console.log("Données envoyées au serveur:", data);

                // Envoie les données mises à jour au serveur
                axios.post("http://localhost:3900/dateJPO", data)
                    .then(() => {
                        console.log("La modification a été effectuée avec succès.");
                        loadEvents(); // Recharge les événements avec la nouvelle date
                    })
                    .catch(error => {
                        console.error("Erreur lors de la sauvegarde", error);
                    });
            }
        })
        .catch(error => {
            console.error("Erreur lors de la récupération des données", error);
        });
}

// Charger les événements au démarrage
loadEvents();
