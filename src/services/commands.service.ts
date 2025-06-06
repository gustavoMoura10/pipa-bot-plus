import { SongService } from '../interfaces/song.service';
import { Bot } from '../types/bot';
import { v6 } from 'uuid';
import { SpotifyService } from './spotify.service';
import { YoutubeService } from './youtube.service';
import { createAudioPlayer, NoSubscriberBehavior } from '@discordjs/voice';

export class CommandsService {
  private stringAfter: string;
  private sendMessage: string;
  private serverError: boolean = true;
  private song: SongService;
  constructor(
    stringAfter: string,
    private readonly yoututubeService?: YoutubeService,
    private readonly spotifyService?: SpotifyService,
  ) {
    this.stringAfter = stringAfter;
  }

  async piPlay(bot: Bot): Promise<Bot> {
    try {
      if (this.stringAfter.includes('spotify')) {
        this.song = <SongService>this.spotifyService;
      } else {
        this.song = <SongService>this.yoututubeService;
      }
      const songSearch = await this.song.search(this.stringAfter);
      bot.queue.set(v6(), songSearch);
      const stream = await this.song.getStream(songSearch);
      const player = createAudioPlayer({
        behaviors: {
          noSubscriber: NoSubscriberBehavior.Pause,
        },
      });
      player.play(stream);
      bot.connection?.playOpusPacket(stream);

      await this.songService.play(this.stringAfter, bot);
      return bot;
    } catch (error) {
      console.log(error);
      return bot;
    }
  }
  async piStop(bot: Bot): Promise<Bot> {
    return bot;
  }
  async piQueue(bot: Bot): Promise<Bot> {
    return bot;
  }
  async piPause(bot: Bot): Promise<Bot> {
    return bot;
  }
  async piResume(bot: Bot): Promise<Bot> {
    return bot;
  }
  async piIDF(bot: Bot): Promise<Bot> {
    return bot;
  }
  async piMashAllah(bot: Bot): Promise<Bot> {
    return bot;
  }
  async piLeo(bot: Bot): Promise<Bot> {
    return bot;
  }
  async piHelp(bot: Bot): Promise<Bot> {
    return bot;
  }
  async piVideoAI(bot: Bot): Promise<Bot> {
    return bot;
  }
  async piVideoAIImages(bot: Bot): Promise<Bot> {
    return bot;
  }
}
