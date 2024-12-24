import DB from "@db/index";
import Router from "@koa/router";
import member from "./member";

const members = new Router({
  prefix: "/members",
});

members.get("/", async (ctx) => {
  ctx.body = await DB.discord.members.getAll();
});

members.put("/:id", async (ctx) => {
  const mId = ctx.params.id;
  const payload = ctx.request.body;
  await DB.discord.members.updateMember(mId, payload);
});

export default members.use(member.routes());
