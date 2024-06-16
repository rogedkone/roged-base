import Router from '@koa/router';
import discord from './discord';

const router = new Router();

export default router.use(discord.routes());
