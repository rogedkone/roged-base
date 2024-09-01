import { Composer } from 'grammy';
import { MyContext } from 'telegram/bot';
import queries from './callbackQueries';
import commands from './commands';
import events from './events';

export default new Composer<MyContext>(events, commands, queries);
