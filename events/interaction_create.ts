import { EventBase } from '../bases/event';
import { Logger } from '../managers/logger';
import { Events, Interaction, CacheType,InteractionType } from 'discord.js';
import { CommandConstructor } from '../bases/command';
import { join } from 'path';
import { ModalConstructor } from '../bases/modal';

export default class InteractionCreate implements EventBase {
    public type: Events = Events.InteractionCreate;
    private logger: Logger = new Logger("InteractionCreate");

    async handle(interaction: Interaction<CacheType>): Promise<void> {
        switch (interaction.type) {
            case InteractionType.ApplicationCommand: {
                this.logger.debug(`Received application command interaction for ${interaction.commandName} from ${interaction.user.tag}`);

                const command = await import(join(__dirname, `../interactions/commands/${interaction.commandName}`));
                const CommandClass: CommandConstructor | undefined = command.default || command[Object.keys(command)[0]];

                if (!CommandClass) {
                    this.logger.warn(`No export found in ${interaction.commandName}`);

                    // Response to interaction
                    interaction.reply({ content: `Command ${interaction.commandName} not found`, ephemeral: true });

                    return;
                }

                CommandClass!.handle(interaction);
                break;
            }
            case InteractionType.ModalSubmit: {
                this.logger.debug(`Received modal submit interaction for ${interaction.customId} from ${interaction.user.tag}`);
                
                const modalName = interaction.customId.split('-')[0];
                const modal = await import(join(__dirname, `../interactions/modals/${modalName}`));
                const ModalClass: ModalConstructor | undefined = modal.default || modal[Object.keys(modal)[0]];

                if (!ModalClass) {
                    this.logger.warn(`No export found in ${modalName}`);

                    // Response to interaction
                    interaction.reply({ content: `Modal ${modalName} not found`, ephemeral: true });

                    return;
                }

                ModalClass!.handle(interaction);
                
                break;
            }
        }
    }
}
