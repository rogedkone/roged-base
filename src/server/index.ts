import koaBody from 'koa-body';
import Koa from 'koa';
import router from '@router/index';

const app = new Koa();

app
  .use(koaBody())
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3000);

process.on('uncaughtException', (err) => {
  console.log('Caught exception: ', err);
});
