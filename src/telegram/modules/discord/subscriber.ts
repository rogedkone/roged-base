import Base from '@db/base';
import updateStatusMessage from './utils/updateStatusMessage';

Base.ref('discord/members').on('notify_child_changed').subscribe(updateStatusMessage);
