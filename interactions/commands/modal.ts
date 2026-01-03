import { CommandBase } from '../../bases/command';
import { CacheType, Interaction, MessageFlags, RESTPostAPIApplicationCommandsJSONBody, SlashCommandBuilder} from 'discord.js';
import { Logger } from '../../managers/logger';
import { join } from 'path';
import { ModalConstructor } from '../../bases/modal';

export default class ModelCommand extends CommandBase {
    public static logger: Logger = new Logger("ModalCommand");

    public static async handle(interaction: Interaction<CacheType>): Promise<void> {
        if (!interaction.isChatInputCommand()) return;
        if (interaction.user.id !== process.env.OWNER_ID) {
            await interaction.reply({ content: "You do not have permission to use this command.", flags: MessageFlags.Ephemeral });
            return;
        }
        this.logger.debug(`Received command \`${interaction.commandName}\` from ${interaction.user.tag}`);

        // Get the name of the model
        const name = interaction.options.getString("name");

        try {
            const modal = await import(join(__dirname, "../modals/" + name));
            const ModalClass: ModalConstructor | undefined = modal.default || modal[Object.keys(modal)[0]];

            if (!ModalClass) {
                interaction.reply({ content: `Modal ${name} not found`, flags: MessageFlags.Ephemeral });
                this.logger.warn(`No export found in ${name}`);
                return;
            }

            // Response to the interaction
            interaction.showModal(ModalClass.build());
        } catch (error) {
            this.logger.error(`Failed to load modal from ${name}:`, error);

            // Response to the interaction
            interaction.reply({ content: `Modal ${name} not found`, flags: MessageFlags.Ephemeral });
        }
    }

    public static register(): RESTPostAPIApplicationCommandsJSONBody {
        return new SlashCommandBuilder()
            .setName("modal")
            .setDescription("Command to open a modal")
            .addStringOption((option) =>
                option
                    .setName("name")
                    .setDescription("The name of the model")
                    .setRequired(true)
            )
            .toJSON();
    }
}