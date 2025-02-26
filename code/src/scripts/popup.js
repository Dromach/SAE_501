document.addEventListener("DOMContentLoaded", () => {
    const articleLinks = document.querySelectorAll("a.article-modal-trigger");
    const modal = document.getElementById("article-modal");
    const modalClose = document.getElementById("modal-close");

    articleLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            modal.classList.remove("hidden");
        });
    });

    modalClose.addEventListener("click", () => {
        modal.classList.add("hidden");
    });

    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.classList.add("hidden");
        }
    });
});
