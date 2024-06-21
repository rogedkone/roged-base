/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable import/prefer-default-export */
import { Conversation } from '@grammyjs/conversations';
import DB from '@db/index';
import { MyContext } from '../bot';
import { pushToDelete } from '../utils';

type MyConversation = Conversation<MyContext>;

export const addNewActivity = async (conversation: MyConversation, ctx: MyContext) => {
  let message = await ctx.reply('Мне нужен ID активности', {
    message_thread_id: ctx.update.message?.message_thread_id,
  });

  const activityId = await conversation.waitFor(':text', {
    otherwise: (ctx) => {
      ctx.reply('Ну блять ты дурак, нужен ID', { message_thread_id: ctx.update.message?.message_thread_id });
    },
  });

  ctx.deleteMessages([message.message_id, activityId.message?.message_id ?? -1]);

  message = await ctx.reply('Отлично. Отправь иконку имени:', { message_thread_id: ctx.update.message?.message_thread_id });
  const nameIcon = await conversation.waitFor(':text', {
    otherwise: (ctx) => {
      ctx.reply('Ты точно дурак дурак', { message_thread_id: ctx.update.message?.message_thread_id });
    },
  });

  ctx.deleteMessages([message.message_id, nameIcon.message?.message_id ?? -1]);

  message = await ctx.reply('Отлично. Отправь иконку описания:', { message_thread_id: ctx.update.message?.message_thread_id });
  const descIcon = await conversation.waitFor(':text', {
    otherwise: (ctx) => {
      ctx.reply('Ты точно дурак дурак', { message_thread_id: ctx.update.message?.message_thread_id });
    },
  });

  ctx.deleteMessages([message.message_id, descIcon.message?.message_id ?? -1]);

  message = await ctx.reply('Отлично. Отправь иконку статуса:', { message_thread_id: ctx.update.message?.message_thread_id });
  const statusIcon = await conversation.waitFor(':text', {
    otherwise: (ctx) => {
      ctx.reply('Ты точно дурак дурак', { message_thread_id: ctx.update.message?.message_thread_id });
    },
  });

  ctx.deleteMessages([message.message_id, statusIcon.message?.message_id ?? -1]);

  if (activityId && nameIcon && descIcon && statusIcon) {
    await DB.discord.activities.activity.post({
      id: activityId.message?.text ?? '',
      name: nameIcon.message?.text ?? '',
      desc: descIcon.message?.text ?? '',
      state: statusIcon.message?.text ?? '',
    });

    pushToDelete(await ctx.reply('Успешно добавил', { message_thread_id: ctx.update.message?.message_thread_id }));
  }
};
