import { ModalBase } from "../../bases/modal";
import { CacheType, GuildMember, GuildMemberRoleManager, Interaction, LabelBuilder, MessageFlags, ModalBuilder, TextDisplayBuilder, TextInputBuilder, TextInputStyle} from "discord.js";

export default class NicknameModal extends ModalBase {
    public static async handle(interaction: Interaction<CacheType>): Promise<void> {
        if (!interaction.isModalSubmit()) return;

        const nickname = interaction.fields.getTextInputValue("nickname");
        const roles = (interaction.member?.roles as GuildMemberRoleManager)?.cache;
        const roleMap: Record<string, string> = {
            "1423565761384939570": "CCS", // 中央指揮系統
            "1423568628111904809": "MES", // 任務執行系統
            "1423569181156184136": "ELS", // 外部連接系統
            "1423568430422032405": "FNS", // 艦隊領航系統
            "1423568129606549564": "LSS", // 生命保障系統
            "1449456403163910185": "RAS", // 資源調度系統
            "1423568475464663170": "VRS", // 視覺宣染系統
            "1423568368237019166": "ETS", // 裝備技術系統
        };
        const hasRoles = Object.entries(roleMap)
            .filter(([id]) => roles.has(id))
            .map(([, abbr]) => abbr);

        await (interaction.member as GuildMember).setNickname(`[${hasRoles.join("/")}] ${nickname}`);
        await interaction.reply({ content: "已成功更新名稱！", flags: MessageFlags.Ephemeral });
    }

    public static build(): ModalBuilder {
        return new ModalBuilder()
            .setCustomId('nickname')
            .setTitle('花名提交')
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
