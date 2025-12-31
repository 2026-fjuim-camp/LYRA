import { EventBase, EventManager } from '../managers/event';
import { Logger } from '../managers/logger';
import { Client, Events } from 'discord.js';
import { InteractionManager } from '../managers/interaction';

export default class ReadyEvent implements EventBase {
    public type: Events = Events.ClientReady;
    private logger: Logger = new Logger("ClientReady");

    async handle(client: Client<boolean>): Promise<void> {
        this.logger.log(`${client.user?.tag} is ready!\n`);

        // Register all events
        let event = EventManager.instance;
        await event.registerAll();
        this.logger.log("Successfully registered all events.\n");

        // Register all interactions
        let interaction = new InteractionManager(client);
        await interaction.registerAll();
        this.logger.log("Successfully registered all interactions.\n");
    }
}
