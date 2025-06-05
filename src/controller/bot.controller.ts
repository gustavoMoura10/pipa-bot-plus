import { Client, Message } from 'discord.js';
import { SongService } from '../interfaces/song.service';
import { ClientDiscord } from '../config/client.discord';
import { Bot } from '../types/bot';
import commands from '../types/commands';


export class BotController {
  private bot: Bot;
  constructor(private readonly songService: SongService) {
    this.bot = {
      queue: new Map().set('test', 'test'),
      channel: null,
      voiceChannel: null,
      guild: null
    }
  }
  async configBot(): Promise<void> {
    const client: Client = await new ClientDiscord().getClient();
    client.on('messageCreate', async (message: Message) => {
      this.bot = {
        ...this.bot,
        queue: new Map().set('test', 'test'),
        channel: message.channel,
        voiceChannel: message.member?.voice.channel,
        guild: message.guild,
      }
      for (const command in commands) {
        if (message.content.startsWith(command)) {
          const afterCommand = message.content.slice(command.length);
          if (typeof commands[command] == 'function') await commands[command](afterCommand,this.bot);
        }
      }
    });
  }
}
