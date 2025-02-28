document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("[data-async-comment-form]").forEach((form) => {
        form.addEventListener("submit", async (e) => {
            e.preventDefault(); // ❌ Empêche la redirection vers une autre page
            
            const formData = new FormData(form);
            const formValues = Object.fromEntries(formData);

            try {
                await fetch(form.action, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formValues),
                });

                // ✅ Ajouter le commentaire sans recharger la page
                document.querySelector("#async-comment-container").innerHTML += `
                    <div class="p-4 mt-4 bg-white border rounded-lg shadow">
                        <p class="font-bold">${formValues.nickname || "Anonyme"}</p>
                        <p>${formValues.content}</p>
                        <p class="text-xs text-gray-500">Il y a quelques secondes</p>
                    </div>
                `;

                form.reset(); // 🛠 Réinitialiser le formulaire après soumission
            } catch (error) {
                console.error("Erreur lors de l'envoi du commentaire :", error);
            }
        });
    });
});
