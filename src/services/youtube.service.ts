import { SongService } from '../interfaces/song.service';
import { Song } from '../types/song';
import yts from 'yt-search';
import { YTDLCoreService } from './ytdl.core.service';

export class YoutubeService implements SongService {
  constructor(private readonly YTDLCoreService: YTDLCoreService) {}
  async search(value: string): Promise<Song> {
    let id: string = '';
    if (value.includes('watch?v=')) {
      id = `${value.split('watch?v=').pop()}`;
    }

    const search = (await yts({ videoId: id })) || (await yts({ search: value }));

    return <Song>{
      title: search?.title,
      url: search?.url,
      thumbnail: search?.thumbnail,
      artist: search?.author.name,
    };
  }

  getStream(song: Song) {
    return this.YTDLCoreService.getStream(song);
  }
}
