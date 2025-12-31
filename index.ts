import 'dotenv/config';
import { Client, GatewayIntentBits } from 'discord.js';
import { EventManager } from './managers/event';
import { Logger } from './managers/logger';

class Main {
    public static instance: Main;
    logger: Logger = new Logger("Main");
    client: Client = new Client({ intents: [GatewayIntentBits.Guilds] });

    constructor() {
        Main.instance = this;
    }

    async main(): Promise<void> {
        // Register ready event
        let event = new EventManager(this.client);
        await event.register("ready.js");

        // Login to bot
        await this.login();
    }

    async login(): Promise<void> {
        this.client.login(process.env.DISCORD_TOKEN);
    }
}

new Main().main();
