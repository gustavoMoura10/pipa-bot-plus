import ytdl from 'ytdl-core';
import { Song } from '../types/song';

export class YTDLCoreService {
  async getStream(song: Song) {
    return await ytdl(song.url, { filter: 'audioonly' });
  }
}
