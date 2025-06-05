import { Song } from '../types/song';

export interface SongService {
  search(value: string): Promise<Song> | Song;
  getStream(song: Song): Promise<unknown>;
}
