import { EventBase } from '../managers/event';
import { Logger } from '../managers/logger';
import { Events, Interaction, CacheType } from 'discord.js';

export default class InteractionCreate implements EventBase {
    public type: Events = Events.InteractionCreate;
    private logger: Logger = new Logger("InteractionCreate");

    async handle(interaction: Interaction<CacheType>): Promise<void> {
        if (interaction.isCommand()) {
            this.logger.debug("ApplicationCommand");
            interaction.deferReply();
        }
    }
}
