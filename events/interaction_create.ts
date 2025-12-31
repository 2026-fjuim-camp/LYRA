import { EventBase } from '../managers/event';
import { Logger } from '../managers/logger';
import { Events, Interaction, CacheType,InteractionType } from 'discord.js';
import { CommandConstructor } from '../interactions/command';
import { join } from 'path';

export default class InteractionCreate implements EventBase {
    public type: Events = Events.InteractionCreate;
    private logger: Logger = new Logger("InteractionCreate");

    async handle(interaction: Interaction<CacheType>): Promise<void> {
        switch (interaction.type) {
            case InteractionType.ApplicationCommand: {
                const command = await import(join(__dirname, `../interactions/commands/${interaction.commandName}`));
                const CommandClass: CommandConstructor | undefined = command.default || command[Object.keys(command)[0]];

                if (!CommandClass) {
                    this.logger.warn(`No export found in ${interaction.commandName}`);
                    return;
                }

                CommandClass!.handle(interaction);
                break;
            }
        }
    }
}
