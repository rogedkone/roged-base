import Base from '@db/base';
import io from 'socket';

Base.ref('discord/members').on('notify_child_changed').subscribe(async () => {
  const data = await Base.ref('discord/members').get();
  io.emit('discord/members:update', data.val());
});
