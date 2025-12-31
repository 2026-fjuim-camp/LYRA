import { Logger } from '../managers/logger';
import { RESTPostAPIApplicationCommandsJSONBody } from 'discord.js';

export abstract class CommandBase {
    public static logger: Logger = new Logger("CommandBase");

    public static async handle(...args: any[]): Promise<void> {
        throw new Error('Static method handle() must be implemented by subclass.');
    }

    public static register(): RESTPostAPIApplicationCommandsJSONBody {
        throw new Error('Static method register() must be implemented by subclass.');
    }
}

export type CommandConstructor = typeof CommandBase & {
    new(): CommandBase;
    handle(...args: any[]): Promise<void>;
    register(): RESTPostAPIApplicationCommandsJSONBody;
};