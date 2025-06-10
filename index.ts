import 'dotenv/config';
import { YTDLCoreService } from './src/services/ytdl.core.service';
import { Song } from './src/types/song';

(async () => {
  try {
    await new YTDLCoreService().getStream({
      url: 'https://www.youtube.com/watch?v=9bZkp7q19f0',
    } as Song);
  } catch (error) {
    console.log(error);
  }
})();
