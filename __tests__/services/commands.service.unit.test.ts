import 'dotenv/config';
import { Channel, Client, VoiceChannel } from 'discord.js';
import { Bot } from '../../src/types/bot';
import findCommand from '../../src/utils/findCommand';
import { ClientDiscord } from '../../src/config/client.discord';
let bot: Bot;
let client: Client;
beforeAll(async () => {
  client = await new ClientDiscord().getClient();
});
afterAll(async() => {
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
      guild:guild,
    };
    const resultCommand = findCommand('!pi-play America Simon & Garfunkel');
    expect(resultCommand?.execute.name).toBe('bound piPlay');
    expect(resultCommand?.type).toBe('voice');
    if (typeof resultCommand?.execute === 'function') {
      bot = <Bot>await resultCommand?.execute(bot);
      expect(bot.queue.size).toBeGreaterThan(0);
    }
  });
});
