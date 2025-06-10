import 'dotenv/config';
import { Channel, Client, VoiceChannel } from 'discord.js';
import { Bot } from '../../src/types/bot';
import findCommand from '../../src/utils/findCommand';
import { ClientDiscord } from '../../src/config/client.discord';
import { DiscordGatewayAdapterCreator, joinVoiceChannel } from '@discordjs/voice';
let bot: Bot;
let clientDiscord: ClientDiscord;
let client: Client;
beforeAll(async () => {
  clientDiscord = new ClientDiscord();
  client = await clientDiscord.getClient();
});
afterAll(async () => {
  jest.setTimeout(20000);

  await client.destroy();
});
describe('CommandsService class test', () => {
  it('CommandsService piPlay function test any song', async () => {
    const guild = client.guilds.cache.first();
    const channel = guild?.channels?.cache
      ?.filter((channel: Channel) => channel instanceof VoiceChannel)
      .first();
    bot = {
      ...bot,
      queue: new Map(),
      channel: channel,
      voiceChannel: channel,
      guild: guild,
      connection:null
    };
    bot.connection = joinVoiceChannel({
      channelId: `${bot?.voiceChannel?.id}` || '',
      guildId: `${bot?.guild?.id}` || '',
      adapterCreator:bot?.guild?.voiceAdapterCreator as DiscordGatewayAdapterCreator,
    });
    const resultCommand = findCommand('!pi-play America Simon & Garfunkel');
    expect(resultCommand?.execute.name).toBe('bound piPlay');
    expect(resultCommand?.type).toBe('voice');
    if (typeof resultCommand?.execute === 'function') {
      bot = <Bot>await resultCommand?.execute(bot);
      expect(bot.queue.size).toBeGreaterThan(0);
      bot.connection?.disconnect();
    }
  });
});
