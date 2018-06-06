const TelegramBot = require("node-telegram-bot-api");

const { whenBreakfast } = require("./breakfast");
const { token } = require("./config");

const bot = new TelegramBot(token, {
  polling: true,
});

bot.onText(/\/start/, (msg, match) => {
  if (msg.text !== "/start") return;
  const chatId = msg.chat.id;
  const message = "Чтобы узнать когда завтрак, напиши команду /breakfast";
  bot.sendMessage(chatId, message);
});

bot.onText(/\/breakfast|\/breakfast@SPBFrontendBreakfastBot/, (msg, match) => {
  const { text, chat } = msg;
  if (match.length) {
    const message = whenBreakfast();
    if (message) {
      bot.sendMessage(chat.id, message);
    }
  }
});
