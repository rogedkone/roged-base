import DB from '@db/index';
import Router from '@koa/router';

const member = new Router();

member.get('/:id', async (ctx) => {
  ctx.body = await DB.discord.members.getAll();
});

member.post('/', async (ctx) => {
  if (!ctx.request.body.id) ctx.throw(400);
  else ctx.body = await DB.discord.members.updateMember(ctx.request.body.id, ctx.request.body);
});

member.patch('/:id', async (ctx) => {
  ctx.body = await DB.discord.members.updateMember(ctx.params.id, ctx.request.body);
});

member.del('/:id', async (ctx) => {
  ctx.body = await DB.discord.members.removeMember(ctx.params.id);
});

export default member;
