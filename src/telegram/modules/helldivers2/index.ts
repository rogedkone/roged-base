import { Composer } from 'grammy';
import { MyContext } from 'telegram/bot';
import commands from './commands';

export default new Composer<MyContext>(commands.middleware());
