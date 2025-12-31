import { Logger } from '../managers/logger';
import { ModalBuilder } from 'discord.js';

export abstract class ModalBase {
    public static logger: Logger = new Logger("ModalBase");

    public static async handle(...args: any[]): Promise<void> {
        throw new Error('Static method handle() must be implemented by subclass.');
    }

    public static build(...args: any[]): ModalBuilder {
        throw new Error('Static method build() must be implemented by subclass.');
    }
}

export type ModalConstructor = typeof ModalBase & {
    new(): ModalBase;
    handle(...args: any[]): Promise<void>;
    build(...args: any[]): ModalBuilder;
};