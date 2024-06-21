import { Composer } from 'grammy';
import { MyContext } from 'telegram/bot';
import queries from './callbackQueries';
import commands from './commands';

export default new Composer<MyContext>(commands.middleware(), queries.middleware());
