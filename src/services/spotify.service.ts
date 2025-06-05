import axios from 'axios';
import { SongService } from '../interfaces/song.service';
import { Song } from '../types/song';
import { YTDLCoreService } from './ytdl.core.service';

export class SpotifyService implements SongService {
  private clientID: string;
  private clientSecret: string;
  constructor(private readonly YTDLCoreService: YTDLCoreService) {
    this.clientID = `${process.env.SPOTIFY_CLIENT_ID}`;
    this.clientSecret = `${process.env.SPOTIFY_CLIENT_SECRET}`;
  }
  private async authorize() {
    const result = await axios.post(
      'https://accounts.spotify.com/api/token',
      'grant_type=client_credentials',
      {
        headers: {
          Authorization:
            'Basic ' + Buffer.from(this.clientID + ':' + this.clientSecret).toString('base64'),
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );
    return result.data.access_token;
  }
  async search(value: string): Promise<Song> {
    const token = this.authorize();
    const trackId = value.split('track/').pop();
    const res = await axios.get(`https://api.spotify.com/v1/tracks/${trackId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const track = res.data;
    return <Song>{
      title: track.name,
      url: track.external_urls.spotify,
      thumbnail: track.album.images[0].url,
      artist: track.artists[0].name,
    };
  }
  getStream(song: Song): Promise<unknown> {
    return this.YTDLCoreService.getStream(song);
  }
}
