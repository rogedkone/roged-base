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

export const getTelegram = (id: string) => {
  const logins: Record<string, string> = {
    '859542715972321320': 'rogedkone',
    '279708254420992011': 'Mr_Antiz',
    '525391605062959114': 'PotatoDungeonMaster',
    '487400812570607616': 'conceptira',
    288258478110146560: 'RyuNoChi',
  };

  return logins[id] ?? 'none';
};
