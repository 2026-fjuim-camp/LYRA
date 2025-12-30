import { EventBase } from '../managers/event';
import { Logger } from '../managers/logger';
import { Client, Events } from 'discord.js';

export default class ReadyEvent implements EventBase {
    public type: Events = Events.ClientReady;
    private logger: Logger = new Logger("ClientReady");

    async handle(client?: Client<boolean>, ...args: any[]): Promise<void> {
        this.logger.log(`${client!.user?.tag} is ready!`);
    }
}
