import TomSelect from "tom-select";

console.log("JS chargé !");

document.addEventListener("DOMContentLoaded", function () {
    const select = document.querySelector("#auteur");

    if (!select) {
        console.error("L'élément #auteur n'a pas été trouvé !");
        return;
    }

    // Faire la requête pour obtenir tous les auteurs
    fetch("/api/authors")
        .then(response => response.json())
        .then(data => {
            // Créer un tableau d'options avec les données de l'API
            const options = data.data.map(author => {
                return new Option(author.firstname + " " + author.lastname, author._id);
            });

            // Ajouter les options à l'élément select
            select.append(...options);

            // Initialiser TomSelect une fois que les options sont ajoutées
            const ts = new TomSelect(select, {
                valueField: "_id",
                labelField: "firstname",
                searchField: "firstname",
                create: false,
            });

            console.log("TomSelect initialisé :", ts);
        })
        .catch(error => {
            console.error("Erreur lors de la récupération des auteurs :", error);
        });
});
