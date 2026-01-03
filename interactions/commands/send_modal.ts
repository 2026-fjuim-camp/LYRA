import { CommandBase } from '../../bases/command';
import { ActionRowBuilder, ButtonBuilder, ButtonStyle, CacheType, Interaction, MessageFlags, RESTPostAPIApplicationCommandsJSONBody, SlashCommandBuilder} from 'discord.js';
import { Logger } from '../../managers/logger';

export default class ModelCommand extends CommandBase {
    public static logger: Logger = new Logger("SendModalCommand");

    public static async handle(interaction: Interaction<CacheType>): Promise<void> {
        if (!interaction.isChatInputCommand()) return;
        if (interaction.user.id !== process.env.OWNER_ID) {
            await interaction.reply({ content: "You do not have permission to use this command.", flags: MessageFlags.Ephemeral });
            return;
        }
        this.logger.debug(`Received command \`${interaction.commandName}\` from ${interaction.user.tag}`);

        // Get the name of the model
        const name = interaction.options.getString("name");

        switch (name) {
            case "verify":
                if (!interaction.channel?.isSendable()) {
                    await interaction.reply({ content: "Cannot send message in this channel.", flags: MessageFlags.Ephemeral });
                    return;
                }

                let actionRow = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId("verify")
                            .setLabel("點此驗證")
                            .setStyle(ButtonStyle.Primary)
                    )
                    .toJSON();

                interaction.channel.send({
                    content: "請點擊下方按鈕以進行驗證。",
                    components: [actionRow],
                });

                interaction.reply({ content: "Modal button sent successfully.", flags: MessageFlags.Ephemeral });

                break;
            default:
                interaction.reply({ content: `Modal ${name} not found`, flags: MessageFlags.Ephemeral });
                return;
        }
    }

    public static register(): RESTPostAPIApplicationCommandsJSONBody {
        return new SlashCommandBuilder()
            .setName("send_modal")
            .setDescription("Send a message containing a modal button")
            .addStringOption((option) =>
                option
                    .setName("name")
                    .setDescription("The name of the model")
                    .setRequired(true)
            )
            .toJSON();
    }
}