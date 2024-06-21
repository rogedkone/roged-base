import { ConversationFlavor } from '@grammyjs/conversations';
import config from '@utils/config';
import {
  Bot, Context, SessionFlavor,
} from 'grammy';

interface SessionData {
}

export type MyContext = Context & SessionFlavor<SessionData> & ConversationFlavor;

const bot = new Bot<MyContext>(config.TG_BOT_TOKEN);

export default bot;
