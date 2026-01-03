import { Logger } from '../managers/logger';

export abstract class ComponentBase {
    public static logger: Logger = new Logger("ComponentBase");

    public static async handle(...args: any[]): Promise<void> {
        throw new Error('Static method handle() must be implemented by subclass.');
    }
}

export type ComponentConstructor = typeof ComponentBase & {
    new(): ComponentBase;
    handle(...args: any[]): Promise<void>;
};