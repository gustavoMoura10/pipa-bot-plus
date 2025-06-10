import { VoiceConnection } from "@discordjs/voice";
import { Channel, Guild, VoiceBasedChannel } from "discord.js";

export type Bot = {
  queue: Map<string, unknown>;
  channel: Channel | null | undefined;
  voiceChannel: VoiceBasedChannel | null | undefined;
  guild: Guild | null | undefined,
  connection:VoiceConnection | null | undefined
};
