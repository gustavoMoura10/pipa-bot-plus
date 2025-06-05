import { Channel, Guild, VoiceBasedChannel } from "discord.js";

export type Bot = {
  queue: Map<string, string>;
  channel: Channel | null | undefined;
  voiceChannel: VoiceBasedChannel | null | undefined;
  guild: Guild | null
};
