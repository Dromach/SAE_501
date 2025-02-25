window.addEventListener("load", function () {
    let savedLogo = localStorage.getItem("footerLogo");
    if (savedLogo) {
        document.getElementById("footer-logo").src = savedLogo; // Applique le logo sauvegardé
    }
});
