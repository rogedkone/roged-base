import config from '@utils/config';
import discord from './discord';
import Base from './base';
import telegram from './telegram';
import self from './self';

Base.ready(() => {
  console.log(`DB:GLOBAL:STATUS: Launched in: ${config.DB_PATH}`);
  console.log('DB:GLOBAL:STATUS: Ready for connetions');
});

const DB = {
  discord,
  telegram,
  self,
};

export default DB;
