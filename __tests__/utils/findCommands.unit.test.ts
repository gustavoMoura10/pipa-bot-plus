import findCommand from "../../src/utils/findCommand";

describe('Find the bot command based on it prefixes', () => {
    it('Should return piPlay', () => {
        const resultCommand = findCommand('!pi-play America Simon & Garfunkel');
        expect(resultCommand?.execute.name).toBe('bound piPlay');
    });
    it('Should return piStop', () => {
        const resultCommand = findCommand('!pi-stop');
        expect(resultCommand?.execute.name).toBe('bound piStop');
    });
    it('Should return piQueue', () => {
        const resultCommand = findCommand('!pi-queue');
        expect(resultCommand?.execute.name).toBe('bound piQueue');
    });
})