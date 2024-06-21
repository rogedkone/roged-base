// import guildMemberUpdate from './guildMemberUpdate';
import interactionCreate from './interactionCreate';
import presenceUpdate from './presenceUpdate';
import voiceStateUpdate from './voiceStateUpdate';
import initMembers from './initMembers';

const initEvents = () => {
  interactionCreate();
  // guildMemberUpdate();
  initMembers();
  presenceUpdate();
  voiceStateUpdate();
};

export default initEvents;
