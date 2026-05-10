require("dotenv").config();
const { Telegraf } = require("telegraf");
const fs = require("fs");
const { startLoop } = require("./watcher");

const bot = new Telegraf(process.env.BOT_TOKEN);

let data = require("./data.json");

bot.command("add", (ctx) => {
    const user = ctx.message.text.split(" ")[1];
    data.users.push(user);

    fs.writeFileSync("./data.json", JSON.stringify(data, null, 2));
    ctx.reply("Added: " + user);
});

bot.command("list", (ctx) => {
    ctx.reply(data.users.join("\n"));
});

bot.command("remove", (ctx) => {
    const user = ctx.message.text.split(" ")[1];
    data.users = data.users.filter(u => u !== user);

    fs.writeFileSync("./data.json", JSON.stringify(data, null, 2));
    ctx.reply("Removed: " + user);
});

bot.launch();

startLoop(bot);

console.log("Bot running...");
