export class Logger {
    name: String;

    constructor(name: String) {
        this.name = name;
    }

    async debug(...msg: any[]): Promise<void> {
        console.debug(`[DEBUG] [${this.name}] ${msg}`);
    }

    async log(...msg: any[]): Promise<void> {
        console.log(`[LOG] [${this.name}] ${msg}`);
    }

    async warn(...msg: any[]): Promise<void> {
        console.warn(`[WARNING] [${this.name}] ${msg}`);
    }

    async error(...msg: any[]): Promise<void> {
        console.error(`[ERROR] [${this.name}] ${msg}`);
    }
}
