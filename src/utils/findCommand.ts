import commands from '../consts/commands';
import { CommandsService } from '../services/commands.service';

const findCommand = (string: string) => {
  let stringAfter: string = '';
  let functionName: string = '';
  Object.keys(commands).forEach((key) => {
    if (string.startsWith(key)) {
      const splitString = string.split(key);
      functionName = key;
      stringAfter = splitString.pop() || '';
    }
  });
  const commandsService = new CommandsService(stringAfter);
  if (commands[functionName].execute in commandsService) {
    return {
      execute: commandsService[commands[functionName].execute as keyof CommandsService],
      type: commands[functionName].type,
    };
  }
};

export default findCommand;
