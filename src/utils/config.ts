import path from 'path';
import Strict from './strict';

export default {
  DB_PATH: path.resolve(__dirname, '..', '..', '..', 'database'),
  ...Strict,
};
