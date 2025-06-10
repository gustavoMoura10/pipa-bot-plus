import { SongService } from '../interfaces/song.service';
import { Bot } from '../types/bot';
import { v6 } from 'uuid';
import { SpotifyService } from './spotify.service';
import { YoutubeService } from './youtube.service';
import {
  createAudioPlayer,
  createAudioResource,
  NoSubscriberBehavior,
  StreamType,
} from '@discordjs/voice';
import { YTDLCoreService } from './ytdl.core.service';
import ffmpeg from 'fluent-ffmpeg';
import ffmpegPath from 'ffmpeg-static';

export class CommandsService {
  private stringAfter: string;
  private serverError: boolean = true;
  private song?: SongService;
  private yoututubeService?: YoutubeService;
  private spotifyService?: SpotifyService;
  constructor(stringAfter: string) {
    if (ffmpegPath) {
      ffmpeg.setFfmpegPath(ffmpegPath);
    }
    this.stringAfter = stringAfter;
    this.yoututubeService = new YoutubeService(new YTDLCoreService());
    this.spotifyService = new SpotifyService(new YTDLCoreService());
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
      const audioResource = createAudioResource(stream, {
        inputType: StreamType.Arbitrary,
        inlineVolume: true,
      });
      await player.play(audioResource);
      await bot.connection?.subscribe(player);
      console.log('Tocando musica');
    } catch (error) {
      console.log(error);
      if (bot.channel && 'send' in bot.channel && !this.serverError)
        bot.channel?.send('ERRO AO TENTAR TOCAR A MUSICA');
    }
    return bot;
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
