document.addEventListener("DOMContentLoaded", function () {
    let fileInput = document.getElementById("logo-input");
    let uploadButton = document.getElementById("upload-logo");

    uploadButton.addEventListener("click", function () {
        fileInput.click();
    });

    fileInput.addEventListener("change", function (event) {
        let file = event.target.files[0]; 
        console.log("Fichier sélectionné :", file);

        if (file) {
            let reader = new FileReader();
                    
            reader.onload = function (e) {
                let logoUrl = e.target.result;
                console.log("Image convertie en base64 :", logoUrl);
                localStorage.setItem("footerLogo", logoUrl);
                console.log("Image enregistrée dans localStorage !");
                alert("Logo mis à jour ! Rechargez la page du footer.");
            };
                   
            reader.readAsDataURL(file);
        } else {
            console.log("Aucun fichier sélectionné !");
        }
    });

    // Réinitialisation du logo
    document.getElementById("reset-logo").addEventListener("click", function () {
        localStorage.removeItem("footerLogo"); 
        alert("Logo réinitialisé ! Rechargez la page du footer.");
    });
});
