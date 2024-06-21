import Base from '@db/base';
import moduleDiscord from 'telegram/modules/discord';

Base.ref('discord/members').on('notify_child_changed').subscribe(() => {
  moduleDiscord.subscribers.updateStatusMessage();
});
