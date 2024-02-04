import mongoose from "mongoose";
import { SERVER_CONFIG } from "../configs/app.config";
import { logger } from "../utils/console.util";

const connectToMongoDb = async () => {
    const dbConnectionString = SERVER_CONFIG.DATABASE_URL();
    return new Promise((resolve, reject) => {
        // @ts-ignore
        mongoose.connect(dbConnectionString)
            .then((res) => {
                logger.print('cyan', '', '\u2705 Database Connection Success!')
                resolve(res)
            })
            .catch((error) => {
                logger.print('red', '', '\u274c Database Connection Failed!')
                reject(error)
            })
    })
}

export {
    connectToMongoDb
}