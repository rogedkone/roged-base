// import Base from '@db/base';

// const get = async () => {
//   const snapshot = await Base.ref<TPinger>('discord/pinger').get();
//   if (snapshot.exists() && snapshot.val()) return snapshot.val();
//   return null;
// };

// const post = async (payload: TPinger) => {
//   await Base.ref('discord/pinger').set(payload);
//   return payload;
// };

// const patch = async (login: string) => {
//   Base.ref<TPinger>('discord/pinger').transaction((snapshot) => {
//     if (!snapshot.exists()) {
//       return null;
//     }

//     const users = snapshot.val()?.users ?? [];

//     return users?.filter((user) => user !== login) ?? users;
//   });
// };

// const del = async () => {
//   await Base.ref('discord/pinger').remove();
//   return true;
// };

// export default {
//   get,
//   post,
//   patch,
//   del,
// };
