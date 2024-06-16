import config from '@utils/config';
import discord from './discord';
import Base from './base';

Base.ready(() => {
  console.log(`DB:GLOBAL:STATUS: Launched in: ${config.DB_PATH}`);
  console.log('DB:GLOBAL:STATUS: Ready for connetions');
});

const DB = {
  discord,
};

export default DB;
