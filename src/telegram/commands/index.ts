import { Composer } from 'grammy';
import activity from './activity';
import { MyContext } from '../bot';
import debug from './debug';

export default new Composer<MyContext>(activity.middleware(), debug.middleware());
