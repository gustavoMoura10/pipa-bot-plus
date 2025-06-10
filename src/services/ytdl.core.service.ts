import ytdl from 'ytdl-core';
import { Song } from '../types/song';
import { Readable } from 'stream';

export class YTDLCoreService {
  async getStream(song: Song): Promise<Readable> {
    const stream = ytdl(song.url, {
      filter: 'audioonly',
      quality: 'highestaudio',
      highWaterMark: 1 << 25,
    });
    return stream;
  }
}
