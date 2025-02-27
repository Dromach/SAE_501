document.addEventListener("DOMContentLoaded", () => {
    const articleLinks = document.querySelectorAll("a.article-modal-trigger");

    articleLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const articleId = link.dataset.articleId;
            
            if (articleId) {
                window.location.href = `/article/${articleId}`;
            }
        });
    });
});
