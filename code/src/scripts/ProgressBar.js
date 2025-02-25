
document.addEventListener("DOMContentLoaded", () => {
    const progressBar = document.querySelector(".progress-bar");

    const updateProgress = () => {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollProgress = (scrollTop / scrollHeight) * 100;

        progressBar.style.height = scrollProgress + "%";
    };

    updateProgress();
    document.addEventListener("scroll", updateProgress);
});
