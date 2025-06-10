import { Song } from '../types/song';
import fs from 'fs';
import { Readable } from 'stream';
import ytdl from '@distube/ytdl-core';
const ytdlOptions = {
  requestOptions: {
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) ' +
        'AppleWebKit/537.36 (KHTML, like Gecko) ' +
        'Chrome/114.0.0.0 Safari/537.36',
      'Accept-Language': 'en-US,en;q=0.9',
    },
  },
};
export class YTDLCoreService {
  async getStream(song: Song): Promise<Readable> {
    const stream = ytdl(song.url, {
      filter: 'audioonly',
      ...ytdlOptions
    });
    stream.pipe(fs.createWriteStream('audio2.mp3'));
    return stream;
  }
}
