import DB from '@db/index';
import Router from '@koa/router';
import member from './member';

const members = new Router({
  prefix: '/members',
});

members.get('/', async (ctx) => {
  ctx.body = await DB.discord.members.getAll();
});

export default members.use(member.routes());
