// Токены берутся из ENV окружения

export default {
  JWT_SECRET: process.env.JWT_SECRET ?? '',
};
