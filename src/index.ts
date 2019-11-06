import * as TelegramBot from "node-telegram-bot-api";

import { whenBreakfast } from "./breakfast";

import { token } from "../config";

const lastMessageData: { timestamp?: number; isNotifySent: boolean } = { timestamp: undefined, isNotifySent: false };
const TEN_SECONDS = 10_000;

const bot = new TelegramBot(token, {
  polling: true
});

bot.onText(/\/start/, msg => {
  if (msg.text !== "/start") return;
  const chatId = msg.chat.id;
  const message = "Чтобы узнать когда завтрак, напиши команду /breakfast";
  bot.sendMessage(chatId, message);
});

bot.onText(/\/breakfast|\/breakfast@SPBFrontendBreakfastBot/, (msg, match: any) => {
  const { chat, from } = msg;

  if (match.length) {
    if (typeof lastMessageData.timestamp === "number" && Date.now() - TEN_SECONDS < lastMessageData.timestamp) {
      if (!lastMessageData.isNotifySent) {
        bot.sendMessage(chat.id, "Оставшееся время до завтрака можно запрашивать только раз в 10 секунд");

        lastMessageData.isNotifySent = true;
      }
    } else {
      const message = whenBreakfast(from);

      if (message) {
        bot.sendMessage(chat.id, message);

        lastMessageData.timestamp = Date.now();
        lastMessageData.isNotifySent = false;
      }
    }
  }
});
