/* eslint-disable import/prefer-default-export */
import DB from '@db/index';
import dayjs from 'dayjs';
import { Presence } from 'discord.js';

export const getLastActivity = async ({ id, presence }: { id: string, presence: Presence | null }) => {
  if (presence && ['online', 'dnd', 'idle'].includes(presence.status)) return -1;

  const member = await DB.discord.members.getMember(id);

  if (member) {
    return member.last_seen === -1 ? dayjs().unix() : member.last_seen;
  }

  return dayjs().unix();
};
