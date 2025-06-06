import ytdl from 'ytdl-core';
import { Song } from '../types/song';

export class YTDLCoreService {
  async getStream(song: Song) {
    const stream = ytdl(song.url, {
      filter: 'audioonly',
      quality: 'highestaudio',
      highWaterMark: 1 << 25,
    });
    return stream;
  }
}
