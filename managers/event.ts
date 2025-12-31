import { Client, ClientEvents, Events } from 'discord.js';
import { readdirSync } from 'fs';
import { join } from 'path';
import { Logger } from './logger';
import { ManagerBase } from '../index';

export class EventManager implements ManagerBase {
    public static instance: EventManager;
    client: Client<boolean>;
    logger: Logger;
    registered: string[];

    constructor(client: Client<boolean>) {
        this.client = client;
        this.logger = new Logger("EventManager");
        this.registered = [];
        EventManager.instance = this;
    }

    async register(file: string, eventsPath?: string): Promise<void> {
        if (this.registered.includes(file)) return;

        eventsPath = eventsPath ?? join(__dirname, '../events');

        try {
            const eventModule = await import(join(eventsPath, file));
            const EventClass = eventModule.default || eventModule[Object.keys(eventModule)[0]];

            if (!EventClass) {
                this.logger.warn(`No export found in ${file}`);
                return;
            }

            const eventInstance: EventBase = new EventClass(this.client);

            this.client.on(eventInstance.type as keyof ClientEvents, async (...args: any[]) => {
                try {
                    await eventInstance.handle(...args);
                } catch (error) {
                    this.logger.error(`Error handling ${eventInstance.type}:`, error);
                }
            });

            this.registered.push(file);

            this.logger.debug(`Registered event: ${eventInstance.type}`);
        } catch (error) {
            this.logger.error(`Failed to load event from ${file}:`, error);
        }
    }

    async registerAll(): Promise<void> {
        const eventsPath = join(__dirname, '../events');
        const files = readdirSync(eventsPath).filter(file => file.endsWith('.js') || file.endsWith('.ts'));

        for (const file of files) {
            await this.register(file, eventsPath);
        }
    }
}

export interface EventBase {
    type: Events;
    handle(...args: any[]): Promise<void>;
}
