import { Events } from 'discord.js';

export interface EventBase {
    type: Events;
    handle(...args: any[]): Promise<void>;
}