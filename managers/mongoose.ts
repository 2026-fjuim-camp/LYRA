import { Logger } from './logger';
import mongoose, { Schema } from 'mongoose';

export class MongooseManager {
    public static instance: MongooseManager;
    logger: Logger = new Logger("MongooseManager");
    mongoose: typeof mongoose | null;

    constructor() {
        MongooseManager.instance = this;
        this.mongoose = null;
    }

    async connect(): Promise<void> {
        return new Promise((resolve) => {
            if (process.env.MONGO_URI == null) {
                this.logger.error("MONGO_URI in environment variable is NULL.");
                process.exit(0);
            }

            mongoose.connect(process.env.MONGO_URI).then((mongoose) => {
                this.logger.log("Connected to MongoDB!");
                this.mongoose = mongoose;
                resolve();
            }).catch((e) => {
                this.logger.debug(e);
                process.exit(0);
            });
        })
    }

    workers(): void {
        let schema = new Schema({
            student_id: { type: String },
            name: { type: String },
            user_id: { type: Number, default: 0 },
            joined: { type: Boolean, default: false },
        });

        mongoose.model("User", schema);
    }

    registerAll(): void {
        this.workers();
    }
}
