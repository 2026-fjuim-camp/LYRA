import 'dotenv/config';
import { Client, Events, GatewayIntentBits } from 'discord.js';
import { EventManager } from './managers/event';
import { Logger } from './managers/logger';

class Main {
    logger: Logger = new Logger("Main");
    client: Client = new Client({ intents: [GatewayIntentBits.Guilds] });

    async main(): Promise<void> {
        // Register events
        let event = new EventManager(this.client);
        await event.registerAll();
        this.logger.log("Successfully registered all events.\n");

        // Login to bot
        await this.login();
    }

    async login(): Promise<void> {
        this.client.login(process.env.DISCORD_TOKEN);
    }
}

new Main().main();
