import { Client } from 'discord.js';
import { readdirSync } from 'fs';
import { join } from 'path';
import { Logger } from './logger';
import { ManagerBase } from '../index';

export class InteractionManager implements ManagerBase {
    public static instance: InteractionManager;
    client: Client<boolean>;
    logger: Logger;
    registered: string[];

    constructor(client: Client<boolean>) {
        this.client = client;
        this.logger = new Logger("InteractionManager");
        this.registered = [];
        InteractionManager.instance = this;
    }

    async register(file: string, interactionsPath?: string): Promise<void> {
        if (this.registered.includes(file)) return;

        interactionsPath = interactionsPath ?? join(__dirname, '../interactions');

        try {
            const eventModule = await import(join(interactionsPath, file));
            const EventClass = eventModule.default || eventModule[Object.keys(eventModule)[0]];

            if (!EventClass) {
                this.logger.warn(`No export found in ${file}`);
                return;
            }

            const instance: ManagerBase = new EventClass(this.client);
            await instance.registerAll();

            this.registered.push(file);

            this.logger.debug(`Registered interaction: ${file}`);
        } catch (error) {
            this.logger.error(`Failed to load interaction from ${file}:`, error);
        }
    }

    async registerAll(): Promise<void> {
        const interactionsPath = join(__dirname, '../interactions');
        const files = readdirSync(interactionsPath).filter(file => file.endsWith('.js') || file.endsWith('.ts'));

        for (const file of files) {
            await this.register(file, interactionsPath);
        }
    }
}
