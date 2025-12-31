import { Client } from 'discord.js';
import { Logger } from '../managers/logger';

export interface ManagerBase {
    client: Client<boolean>;
    logger: Logger;
    registered: string[];

    register(file: string, eventsPath?: string): Promise<void>;
    registerAll(): Promise<void>;
}