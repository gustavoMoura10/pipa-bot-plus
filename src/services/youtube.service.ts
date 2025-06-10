import { SongService } from '../interfaces/song.service';
import { Song } from '../types/song';
import yts, { VideoSearchResult } from 'yt-search';
import { YTDLCoreService } from './ytdl.core.service';
import { Readable } from 'stream';

export class YoutubeService implements SongService {
  constructor(private readonly YTDLCoreService: YTDLCoreService) {}
  async searchById(id: string): Promise<Song> {
    const result = await yts({ videoId: id });
    return <Song>{
      title: result.title,
      url: result.url,
      thumbnail: result.thumbnail,
      artist: result.author.name,
    };
  }
  async searchByQuery(query: string): Promise<Song> {
    let result: VideoSearchResult | null = null;
    try {
      result = (await yts({ search: query }))?.videos[0];
    } catch (error: Error | unknown) {
      console.log(error);
    }
    if (result === null || result === undefined) {
      throw new Error('Video not found');
    }
    return <Song>{
      title: result.title,
      url: result.url,
      thumbnail: result.thumbnail,
      artist: result.author.name,
    };
  }
  async search(value: string): Promise<Song> {
    let id: string = '';
    if (value.includes('watch?v=')) {
      id = `${value.split('watch?v=').pop()}`;
    }
    return id ? await this.searchById(id) : await this.searchByQuery(value);
  }

  getStream(song: Song): Promise<Readable> {
    return this.YTDLCoreService.getStream(song);
  }
}
