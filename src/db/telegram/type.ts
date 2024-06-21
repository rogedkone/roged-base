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

export type TStatus = {
  message: TMessageIdential,
  text: string
};

export type TPinger = {
  message_id: number,
  text: string,
  users: string[],
  expire: number
};
