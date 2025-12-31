import { Client, REST, Routes, RESTPostAPIApplicationCommandsJSONBody } from 'discord.js';
import { readdirSync } from 'fs';
import { join } from 'path';
import { Logger } from '../managers/logger';
import { ManagerBase } from '../bases/manager';
import { CommandConstructor } from '../bases/command';

export class CommandManager implements ManagerBase {
    public static instance: CommandManager;
    client: Client<boolean>;
    logger: Logger;
    registered: string[];

    constructor(client: Client<boolean>) {
        this.client = client;
        this.logger = new Logger("CommandManager");
        this.registered = [];
        CommandManager.instance = this;
    }

    async register(file: string, commandsPath?: string): Promise<void> {
        this.logger.error("Registering single command is not supported.");
    }

    async registerAll(): Promise<void> {
        const commandsPath = join(__dirname, './commands');
        const files = readdirSync(commandsPath).filter(file => file.endsWith('.js') || file.endsWith('.ts'));

        const rest = new REST().setToken(process.env.DISCORD_TOKEN!);
        const commands: RESTPostAPIApplicationCommandsJSONBody[] = [];

        for (const file of files) {
            if (this.registered.includes(file)) return;

            try {
                const eventModule = await import(join(commandsPath, file));
                const EventClass: CommandConstructor | undefined = eventModule.default || eventModule[Object.keys(eventModule)[0]];

                if (!EventClass) {
                    this.logger.warn(`No export found in ${file}`);
                    return;
                }

                commands.push(EventClass.register());
                this.registered.push(file);

                this.logger.debug(`Loaded command: ${file}`);
            } catch (error) {
                this.logger.error(`Failed to load command from ${file}:`, error);
            }
        }

        await rest.put(Routes.applicationCommands(this.client.user!.id), { body: commands });
        this.logger.debug(`Successfully registered all commands.\n`);
    }
}
