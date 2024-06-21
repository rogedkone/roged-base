import DB from '@db/index';
import { generateStatus } from '../utils';

export default async () => {
  const members = await DB.discord.members.getAll();
  if (members === null) return;

  const status = await generateStatus(Object.values(members).sort((a, b) => {
    if (a.nickname && b.nickname) return a.nickname.localeCompare(b.nickname);
    if (a.username && b.username) return a.username.localeCompare(b.username);
    if (a.custom_name && b.custom_name) return a.custom_name.localeCompare(b.custom_name);
    return 1;
  }));

  DB.telegram.status.updateStatus(status);
};
