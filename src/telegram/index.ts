import { session } from "grammy";
import { conversations, createConversation } from "@grammyjs/conversations";
import bot from "./bot";

import "./callback-queries";
import "./workers";
import { addNewActivity } from "./conversations";
import { moduleHelldivers } from "./modules";
import commands from "./commands";
import modulePinger from "./modules/pinger";

bot.use(session({ initial: () => ({}) }));

bot.use(conversations());

bot.use(createConversation(addNewActivity, "discord-activity"));

bot.use(commands.middleware());
bot.use(modulePinger.queries.middleware());
bot.use(moduleHelldivers.middleware());

bot.api.setMyCommands([
  { command: "helldivers", description: "Статус миссии" },
  { command: "activity", description: "Добавить иконки к активности" },
  { command: "debug", description: "Режим разработчика" },
]);

bot.start({
  onStart: () => console.log("BOT:TELEGRAM:STATUS: Started"),
});

bot.catch((err) => console.log("bot error:", err));
