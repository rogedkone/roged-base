import Router from '@koa/router';

const auth = new Router({
  prefix: '/auth',
});

auth.post('/reg', async (ctx) => {
  const { username, password } = ctx.request.body;
});

export default auth.routes();
