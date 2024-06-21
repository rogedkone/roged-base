import { TMember } from '@db/discord/type';
import DB from '@db/index';
import client from '../bot';

export default async () => client.on('voiceStateUpdate', (oldState, newState) => {
  if (!newState.member || newState.member.user.bot) return;

  const update: Partial<TMember> = {
    in_voice: !(newState.channelId === null) || oldState.channelId === null,
  };

  DB.discord.members.updateMember(newState.member.id, update);
});
