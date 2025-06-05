import { Client, GatewayIntentBits } from 'discord.js';

export class ClientDiscord {
  private client: Client;

  constructor() {
    this.client = new Client({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
      ],
    });
  }

  async getClient(): Promise<Client> {
    try {
      await this.client.login(process.env.DISCORD_TOKEN);
      await new Promise((resolve) => this.client.once('ready', () => resolve(true)));
      return this.client;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
