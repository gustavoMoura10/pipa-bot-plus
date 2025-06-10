import { Client, Message, TextChannel } from 'discord.js';
import { SongService } from '../interfaces/song.service';
import { ClientDiscord } from '../config/client.discord';
import { Bot } from '../types/bot';
import findCommand from '../utils/findCommand';
import { DiscordGatewayAdapterCreator, joinVoiceChannel } from '@discordjs/voice';

export class BotController {
  private bot: Bot;
  constructor(private readonly songService: SongService) {
    this.bot = {
      queue: new Map(),
      channel: null,
      voiceChannel: null,
      guild: null,
      connection: null,
    };
  }
  async configBot(): Promise<void> {
    const client: Client = await new ClientDiscord().getClient();
    client.on('messageCreate', async (message: Message) => {
      this.bot = {
        ...this.bot,
        queue: new Map(),
        channel: message.channel,
        voiceChannel: message.member?.voice.channel,
        guild: message.guild,
        connection: null,
      };
      
      const resultCommand = findCommand(message.content);
      if (resultCommand?.type === 'voice') {
        if (!this.bot.voiceChannel && this.bot.channel instanceof TextChannel) {
          await this.bot.channel?.send('IMBECIL! ENTRA EM UM CHAT SEU FILHO DE UMA PUTA!');
          return;
        }
        if (!this.bot.connection) {
          this.bot.connection = joinVoiceChannel({
            channelId: `${this.bot?.voiceChannel?.id}` || '',
            guildId: `${this.bot?.guild?.id}` || '',
            adapterCreator: this?.bot?.guild?.voiceAdapterCreator as DiscordGatewayAdapterCreator,
          });
        }
      }
      if (typeof resultCommand?.execute === 'function') {
        this.bot = <Bot>await resultCommand?.execute(this.bot);
      }
    });
  }
}
