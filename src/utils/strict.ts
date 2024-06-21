// Токены берутся из ENV окружения

export default {
  JWT_SECRET: process.env.JWT_SECRET ?? '',
  OPEN_WEATHER_API_KEY: process.env.OPEN_WEATHER_API_KEY ?? '',
  TG_BOT_TOKEN: process.env.TG_BOT_TOKEN ?? '',
  TG_BOT_CHAT_ID: process.env.TG_BOT_CHAT_ID ?? '',
  TG_BOT_TOPIC_ID: process.env.TG_BOT_TOPIC_ID ?? '',
  DC_BOT_TOKEN: process.env.DC_BOT_TOKEN ?? '',
  DC_APP_ID: process.env.DC_APP_ID ?? '',
  DC_GUILD_ID: process.env.DC_GUILD_ID ?? '',
};
