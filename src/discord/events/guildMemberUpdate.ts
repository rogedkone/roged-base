import client from '../bot';

export default async () => client.on('guildMemberUpdate', (oldMember, newMember) => {
  console.log(newMember);
});
