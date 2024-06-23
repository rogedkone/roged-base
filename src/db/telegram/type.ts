export type TMessage = {
  message_id: number
  from: { id: number, is_bot: boolean, first_name: string, last_name: string, username: string }
  chat: {
    id: number
    title: string
    is_forum: boolean
    type: 'supergroup' | string
  },
  date: number
  message_thread_id?: number
};

export type TMessageIdential = Pick<TMessage, 'message_id'> & { chat: { id: number } };

export type TPinger = {
  text: string,
  users: string[],
  start: number,
  expire: number,
};
