import DB from '@db/index';
import Router from '@koa/router';

const member = new Router();

member.get('/:id', async (ctx) => {
  ctx.body = await DB.discord.members.get();
});

member.post('/', async (ctx) => {
  if (!ctx.request.body.id) ctx.throw(400);
  else ctx.body = await DB.discord.members.member.post(ctx.request.body);
});

member.patch('/:id', async (ctx) => {
  ctx.body = await DB.discord.members.member.patch(ctx.params.id, ctx.request.body);
});

member.del('/:id', async (ctx) => {
  ctx.body = await DB.discord.members.member.del(ctx.params.id);
});

export default member;
