const fs = require("fs");
const { getStoryData } = require("./scraper");

let data = require("./data.json");

async function check(bot) {
    for (let user of data.users) {

        const videoUrl = await getStoryData(user);

        if (!videoUrl) continue;

        if (data.lastState[user] !== videoUrl) {

            data.lastState[user] = videoUrl;
            fs.writeFileSync("./data.json", JSON.stringify(data, null, 2));

            // إرسال تيليجرام
            await bot.telegram.sendMessage(
                process.env.ADMIN_ID,
                `🚨 New Story @${user}\n\n${videoUrl}`
            );
        }
    }
}

function startLoop(bot) {
    setInterval(() => {
        check(bot);
    }, 120000); // دقيقتين
}

module.exports = { startLoop };
