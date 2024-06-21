import Base from '@db/base';
import moduleDiscord from 'telegram/modules/discord';

Base.ref('telegram/status/text').on('value').subscribe((newMessage) => {
  moduleDiscord.subscribers.sendStatusMessage(newMessage.val() ?? 'Сообщения нет');
});
