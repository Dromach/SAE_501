document.addEventListener("DOMContentLoaded", () => {
    // Sélectionne tous les boutons avec un attribut data-theme
    const buttons = document.querySelectorAll("[data-theme]");
    const colorBG = document.getElementById("ColorBG");
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');

    const tailwindColors = {
        "degrade-bleu": "from-blue-200 to-neutral-100",
        "degrade-rouge": "from-red-200 to-neutral-100",
        "degrade-vert": "from-green-200 to-neutral-100",
        "degrade-jaune": "from-yellow-200 to-neutral-100",
        "degrade-violet": "from-purple-200 to-neutral-100"
    };

    // Vérifie que l'élément colorBG existe avant d'ajouter des événements
    if (colorBG) {
        buttons.forEach(button => {
            button.addEventListener("click", (event) => {
                const selectedTheme = event.target.dataset.theme; // Récupère le thème du bouton

                if (tailwindColors[selectedTheme]) {
                    // Supprime toutes les classes existantes qui commencent par "from-" et "to-"
                    const classesToRemove = [...colorBG.classList].filter(cls => 
                        cls.startsWith("from-") || cls.startsWith("to-")
                    );

                    colorBG.classList.remove(...classesToRemove); // On enlève toutes les classes en une seule fois

                    // Ajoute les nouvelles classes du dégradé
                    colorBG.classList.add(...tailwindColors[selectedTheme].split(" "));

                    // Change aussi la meta couleur du thème
                    if (metaThemeColor) {
                        metaThemeColor.setAttribute("content", tailwindColors[selectedTheme]);
                    }

                    // Sauvegarde la préférence en localStorage
                    localStorage.setItem("theme-color", selectedTheme);
                }
            });
        });
    } else {
        console.error("L'élément #ColorBG n'a pas été trouvé !");
    }

    document.getElementById("randomGradient").addEventListener("click", () => {
        const themes = Object.keys(tailwindColors);
        const randomTheme = themes[Math.floor(Math.random() * themes.length)];
    
        // Simule un clic sur un bouton existant
        document.querySelector(`[data-theme="${randomTheme}"]`).click();
    });
    
});