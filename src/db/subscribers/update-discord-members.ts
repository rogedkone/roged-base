/* eslint-disable no-restricted-syntax */
import Base from '@db/base';
import moduleDiscord from 'telegram/modules/discord';
import { TMember } from '@db/discord/type';
import DB from '..';

const tgUsers: Record<string, string> = {
  '859542715972321320': 'rogedkone',
  '279708254420992011': 'Mr_Antiz',
  '525391605062959114': 'PotatoDungeonMaster',
  '487400812570607616': 'conceptira',
  288258478110146560: 'RyuNoChi',
};

Base.ref<Record<string, TMember>>('discord/members').on('value').subscribe(async (newMembers) => {
  moduleDiscord.subscribers.updateStatusMessage();

  const users = (await DB.telegram.pinger.getData())?.users ?? [];

  if (users) {
    const members = newMembers.val() as TMember[];
    const inVoice = Object.values(members).filter(({ in_voice }) => in_voice).map(({ id }) => id);

    for (const userInVoice of inVoice) {
      if (users.includes(tgUsers[userInVoice])) DB.telegram.pinger.removeUser(tgUsers[userInVoice]);
    }
  }
});
