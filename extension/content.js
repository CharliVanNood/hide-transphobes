const blockedUsers = [
    "thewldeninggyre"
];

function scanTweets() {
    let articles = $('[role="region"]').querySelector(':scope > div').querySelector(':scope > div').querySelectorAll(':scope > div');

    for (let article of articles) {
        let links = article.querySelectorAll('a[href^="/"]');
        console.log(links);

        for (let link of links) {
            let username = link
                .getAttribute("href")
                ?.replace("/", "")
                .toLowerCase();
            console.log(username);

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

scanTweets();
setInterval(scanTweets, 1000);
