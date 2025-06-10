import { SongService } from '../interfaces/song.service';
import { Song } from '../types/song';
import yts from 'yt-search';
import { YTDLCoreService } from './ytdl.core.service';

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
    const result = (await yts({ search: query }))?.videos[0];
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

  getStream(song: Song): Promise<ReadableStream<Uint8Array>> {
    return this.YTDLCoreService.getStream(song);
  }
}
