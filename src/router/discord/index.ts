import Router from '@koa/router';
import members from './members';

const discord = new Router({
  prefix: '/discord',
});

export default discord.use(members.routes());
