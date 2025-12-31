import { CommandBase } from '../command';
import { CacheType, Interaction, RESTPostAPIApplicationCommandsJSONBody, SlashCommandBuilder} from 'discord.js';

export default class ModelCommand extends CommandBase {
    async handle(interaction: Interaction<CacheType>): Promise<void> {
        console.log(`Hello from ${interaction.id}`);
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