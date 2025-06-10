import { Song } from '../types/song';
import { Readable } from 'stream';
export interface SongService {
  search(value: string): Promise<Song> | Song;
  getStream(song: Song): Promise<Readable>;
}
