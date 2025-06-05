import { CommandsService } from '../services/commands.service';

const commands = {
  '!pi-play': CommandsService.piPlay,
  '!pi-stop': CommandsService.piStop,
  '!pi-queue': CommandsService.piQueue,
  '!pi-pause': CommandsService.piPause,
  '!pi-resume': CommandsService.piResume,
  '!pi-idf': CommandsService.piIDF,
  '!pi-mashallah': CommandsService.piMashAllah,
  '!pi-leo': CommandsService.piLeo,
  '!pi-help': CommandsService.piHelp,
  '!pi-video-ai': CommandsService.piVideoAI,
  '!pi-video-ai-images': CommandsService.piVideoAIImages,
} as { [key: string]: unknown };

export default commands;
