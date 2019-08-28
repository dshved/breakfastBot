import * as TelegramBot from "node-telegram-bot-api";

import { whenBreakfast } from "./breakfast";

import { token } from "../config";

const bot = new TelegramBot(token, {
  polling: true,
});

bot.onText(/\/start/, msg => {
  if (msg.text !== "/start") return;
  const chatId = msg.chat.id;
  const message = "Чтобы узнать когда завтрак, напиши команду /breakfast";
  bot.sendMessage(chatId, message);
});

<<<<<<< HEAD
bot.onText(
  /\/breakfast|\/breakfast@SPBFrontendBreakfastBot/,
  (msg, match: any) => {
    const { chat, message_id } = msg;
    if (match.length) {
      const message = whenBreakfast();
      if (message) {
        bot.sendMessage(chat.id, message);
        bot.deleteMessage(chat.id, message_id.toString());
      }
=======
bot.onText(/\/breakfast|\/breakfast@SPBFrontendBreakfastBot/, (msg, match: any) => {
  const { chat, from, message_id } = msg;
  if (match.length) {
    const message = whenBreakfast(from);
    if (message) {
      bot.sendMessage(chat.id, message);
      bot.deleteMessage(chat.id, message_id.toString());
>>>>>>> 27099fed7f13801e85a32c4fb5bc5bc27a20cfa4
    }
  }
});
