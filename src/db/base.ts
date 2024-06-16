import config from '@utils/config';
import { AceBase } from 'acebase';

const Base = new AceBase('roged_bots', {
  logLevel: 'error',
  storage: { path: config.DB_PATH },
});

export default Base;
