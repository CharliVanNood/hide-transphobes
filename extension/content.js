let blockedUsers = [];

async function loadBlocklist() {
    blockedUsers = await fetch(
        "https://raw.githubusercontent.com/CharliVanNood/hide-transphobes/refs/heads/main/extension/blocked.json"
    ).then(r => r.json());

    blockedUsers = blockedUsers.map(u => u.toLowerCase());

    console.log("Loaded", blockedUsers.length, "users");
}

function scanTweets() {
    let articles = document.querySelector('[role="region"]').querySelector(':scope > div').querySelector(':scope > div').querySelectorAll(':scope > div');

    for (let article of articles) {
        let links = article.querySelectorAll('a[href^="/"]');

        for (let link of links) {
            let username = link
                .getAttribute("href")
                ?.replace("/", "")
                .toLowerCase();

            if (blockedUsers.includes(username)) {
                for (let span of article.querySelectorAll("span")) {
                    span.textContent = "TRANSPHOBE";
                }
                for (const img of article.querySelectorAll("img")) {
                    img.style.display = "none";
                }
                for (const video of article.querySelectorAll("video")) {
                    video.style.display = "none";
                }
                for (const el of article.querySelectorAll("*")) {
                    if (getComputedStyle(el).backgroundImage !== "none") {
                        el.style.display = "none";
                    }
                }
                break;
            }
        }
    }
}

(async () => {
    console.log("loading blocks");
    await loadBlocklist();

    scanTweets();
    setInterval(scanTweets, 1000);
})();