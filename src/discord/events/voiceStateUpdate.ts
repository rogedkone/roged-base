import { TMember } from "@db/discord/type";
import DB from "@db/index";
import client from "../bot";
import { isPig } from "discord/utils";
import dayjs from "dayjs";

export default async () =>
  client.on("voiceStateUpdate", async (oldState, newState) => {
    if (!newState.member || newState.member.user.bot) return;

    const isInVoice =
      !(newState.channelId === null) || oldState.channelId === null;

    const update: Partial<TMember> = {
      in_voice: isInVoice,
    };

    if (isPig(newState.member.id)) {
      const members = await DB.discord.members.getAll();
      const inVoice = Object.values(members ?? {}).filter(
        ({ in_voice }) => in_voice
      );

      if (isInVoice && inVoice.length > 0) {
        update["last_seen"] = dayjs().unix();
      }
    }

    DB.discord.members.updateMember(newState.member.id, update);
  });
