import { ModalBase } from "../../bases/modal";
import { CacheType, Interaction, LabelBuilder, MessageFlags, ModalBuilder, TextDisplayBuilder, TextInputBuilder, TextInputStyle} from "discord.js";

export default class VerifyModal extends ModalBase {
    public static async handle(interaction: Interaction<CacheType>): Promise<void> {
        if (!interaction.isModalSubmit()) return;

        // TODO: actual verification logic with database
        await interaction.reply({ content: "驗證成功，請查看其他伺服器內之頻道！", flags: MessageFlags.Ephemeral });
    }

    public static build(): ModalBuilder {
        return new ModalBuilder()
            .setCustomId('verify')
            .setTitle('驗證工人身分')
            .addLabelComponents(
                new LabelBuilder()
                    .setLabel("請輸入您的學號")
                    .setTextInputComponent(
                        new TextInputBuilder()
                            .setCustomId('student_id')
                            .setMinLength(9)
                            .setMaxLength(9)
                            .setStyle(TextInputStyle.Short)
                            .setRequired(true)
                            .setPlaceholder("413401120")
                    )
            )
            .addLabelComponents(
                new LabelBuilder()
                    .setLabel("請輸入您的花名")
                    .setTextInputComponent(
                        new TextInputBuilder()
                            .setCustomId('nickname')
                            .setStyle(TextInputStyle.Short)
                            .setRequired(true)
                            .setPlaceholder("Andy")
                    )
            )
            .addTextDisplayComponents(
                new TextDisplayBuilder()
                    .setContent("花名請輸入英文名稱，例如：Andy、Norvin。")
            );
    }
}