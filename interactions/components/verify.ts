import { ComponentBase } from "../../bases/component";
import { ModalConstructor } from "../../bases/modal";
import { join } from "path";
import { CacheType, Interaction, MessageFlags } from "discord.js";

export default class VerifyComponent extends ComponentBase {
    public static async handle(interaction: Interaction<CacheType>): Promise<void> {
        if (!interaction.isMessageComponent()) return;

        try {
            const modal = await import(join(__dirname, "../modals/verify"));
            const ModalClass: ModalConstructor = modal.default || modal[Object.keys(modal)[0]];

            // Response to the interaction
            interaction.showModal(ModalClass.build());
        } catch (error) {
            this.logger.error(`Failed to load modal from \`verify\`:`, error);

            // Response to the interaction
            interaction.reply({ content: `Modal \`verify\` not found`, flags: MessageFlags.Ephemeral });
        }
    }
}