import 'dotenv/config';
import { ClientDiscord } from '../../src/config/client.discord';
import { Channel, Client, TextChannel } from 'discord.js';

let clientDiscord: ClientDiscord;
let client: Client;

beforeAll(async () => {
  clientDiscord = new ClientDiscord();
});
afterAll(async () => {
  await client.destroy();
  await jest.autoMockOn();
});
describe('ClientDiscord class test', () => {
  it('Should get client', async () => {
    const result = await clientDiscord.getClient();
    expect(result).toBeInstanceOf(Client);
    client = result;
  });
  it('Should show all my channels', async () => {
    const result = await client.channels.cache;
    expect(result.size).toBeGreaterThan(0);
  });
  it('Should get a channel', async () => {
    const findChannel: Channel = <Channel>(
      client.channels.cache
        .filter((channel) => channel instanceof TextChannel)
        .find((channel) => channel.name === 'general')
    );
    expect(findChannel).toBeDefined();
  });
  it('Should error getClient', async () => {
    const tempToken = process.env.DISCORD_TOKEN;
    process.env.DISCORD_TOKEN = 'error';
    try {
      await clientDiscord.getClient();
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    }
    process.env.DISCORD_TOKEN = tempToken;
  });
});
