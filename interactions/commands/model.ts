import { CommandBase } from '../command';
import { CacheType, Interaction, RESTPostAPIApplicationCommandsJSONBody, SlashCommandBuilder} from 'discord.js';
import { Logger } from '../../managers/logger';

export default class ModelCommand extends CommandBase {
    public static logger: Logger = new Logger("ModalCommand");

    public static async handle(interaction: Interaction<CacheType>): Promise<void> {
        if (!interaction.isCommand()) return;
        this.logger.debug(`Received command \`${interaction.commandName}\` from ${interaction.user.tag}`);

        // Response to the interaction
        interaction.reply({ content: `Hello from ${interaction.id}` });
    }

    public static register(): RESTPostAPIApplicationCommandsJSONBody {
        return new SlashCommandBuilder()
            .setName("model")
            .setDescription("Command to send a model in the channel")
            .addStringOption((option) =>
                option
                    .setName("name")
                    .setDescription("The name of the model")
                    .setRequired(true)
            )
            .toJSON();
    }
}