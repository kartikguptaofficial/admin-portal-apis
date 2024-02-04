/**
 * Imports the Express app and server configuration. 
 * Starts the Express server by calling app.listen() with the PORT from the config.
 * Logs a message when the server starts.
*/
import app from "./app";
import { SERVER_CONFIG } from "./configs/app.config";
import { connectToMongoDb } from "./db/mongo.db";
import { logger } from "./utils/console.util";

const SERVER_PORT = SERVER_CONFIG.PORT;

connectToMongoDb().then(() => {
    return app.listen(SERVER_PORT, () => {
        logger.success('✅ Database Connection Success!', `🚀 Server is running on port ${SERVER_PORT}`)
    });
}).catch((error) => {
    logger.error(`🛑 Database Connection Failed!`, `❌ Server failed to start due to no database connection!`)
})