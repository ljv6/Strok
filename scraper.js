const { chromium } = require("playwright");

async function getStoryData(username) {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();

    const url = `https://snaptik.kim/tiktok-story-viewer/?user=${username}`;
    await page.goto(url, { waitUntil: "networkidle" });

    // ننتظر الفيديو يظهر
    await page.waitForTimeout(3000);

    const videoUrl = await page.evaluate(() => {
        const video = document.querySelector("video");
        return video ? video.src : null;
    });

    await browser.close();

    return videoUrl;
}

module.exports = { getStoryData };
