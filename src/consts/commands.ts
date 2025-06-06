const commands: { [key: string]: { type: string; execute: string } } = {
  '!pi-play': {
    type: 'voice',
    execute: 'piPlay',
  },
  '!pi-stop': {
    type: 'voice',
    execute: 'piStop',
  },
  '!pi-queue': {
    type: 'text',
    execute: 'piQueue',
  },
  '!pi-pause': {
    type: 'voice',
    execute: 'piPause',
  },
  '!pi-resume': {
    type: 'voice',
    execute: 'piResume',
  },
  '!pi-idf': {
    type: 'text',
    execute: 'piIDF',
  },
  '!pi-mashallah': {
    type: 'text',
    execute: 'piMashAllah',
  },
  '!pi-leo': {
    type: 'text',
    execute: 'piLeo',
  },
  '!pi-help': {
    type: 'text',
    execute: 'piHelp',
  },
  '!pi-video-ai': {
    type: 'text',
    execute: 'piVideoAI',
  },
  '!pi-video-ai-images': {
    type: 'text',
    execute: 'piVideoAIImages',
  },
};

export default commands