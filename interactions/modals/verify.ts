import { ModalBase } from "../../bases/modal";
import { CacheType, Interaction, LabelBuilder, ModalBuilder, TextDisplayBuilder, TextInputBuilder, TextInputStyle} from "discord.js";

export default class VerifyModal extends ModalBase {
    public static async handle(interaction: Interaction<CacheType>): Promise<void> {
        if (!interaction.isModalSubmit()) return;

        this.logger.debug(`Received modal submit interaction for ${interaction.customId} from ${interaction.user.tag}`);

        // TODO: actual verification logic with database
        await interaction.reply({ content: "驗證成功！", ephemeral: true });
    }

    public static build(): ModalBuilder {
        return new ModalBuilder()
            .setCustomId('verify')
            .setTitle('驗證工人身分')
            .addTextDisplayComponents(
                new TextDisplayBuilder()
                    .setContent("請輸入您的學號或姓名以驗證身分（擇一即可）")
            )
            .addLabelComponents(
                new LabelBuilder()
                    .setLabel("請輸入您的學號")
                    .setTextInputComponent(
                        new TextInputBuilder()
                            .setCustomId('student_id')
                            .setMinLength(9)
                            .setMaxLength(9)
                            .setStyle(TextInputStyle.Short)
                            .setRequired(false)
                            .setPlaceholder("413401120")
                    ),
                new LabelBuilder()
                    .setLabel("請輸入您的姓名")
                    .setTextInputComponent(
                        new TextInputBuilder()
                            .setCustomId('student_name')
                            .setStyle(TextInputStyle.Short)
                            .setRequired(false)
                            .setPlaceholder("沈昱安")
                    )
            );
    }
}