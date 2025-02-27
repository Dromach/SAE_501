function loadEvents() {
    fetch('src/data/dateJPO.json')
        .then(response => response.json())  // Convertir la réponse en JSON
        .then(data => {
            const eventsContainer = document.getElementById("JPO-container");
            eventsContainer.innerHTML = '';  // Effacer le contenu précédent

            // Afficher chaque événement
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
            console.error("Erreur lors du chargement du fichier JSON", error);
        });
}

// Fonction pour éditer une date
function editEvent(index) {
    fetch('src/data/dateJPO.json')
        .then(response => response.json())
        .then(data => {
            const event = data.dateJPO[index];
            const newDateDebut = prompt("Modifier la date de début (actuelle : " + event.DateDebut + "):", event.DateDebut);
            const newHeureDebut = prompt("Modifier l'heure de début (actuelle : " + event.HeureDebut + "):", event.HeureDebut);
            const newHeureFin = prompt("Modifier l'heure de fin (actuelle : " + event.HeureFin + "):", event.HeureFin);

            // Si l'utilisateur a modifié la date, on met à jour
            if (newDateDebut && newHeureDebut && newHeureFin) {
                event.DateDebut = newDateDebut;
                event.HeureDebut = newHeureDebut;
                event.HeureFin = newHeureFin;

                // Sauvegarder les nouvelles données dans le fichier JSON (simulation côté client)
                localStorage.setItem('events', JSON.stringify(data)); // Utilisation de localStorage pour simuler une sauvegarde

                loadEvents(); // Recharger les événements avec les nouvelles valeurs
            }
        });
}

// Charger les événements au démarrage
loadEvents();