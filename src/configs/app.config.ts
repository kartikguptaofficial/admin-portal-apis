/**
 * Configures environment variables and server options.
 * Loads environment variables from .env file using dotenv.
 * Defines SERVER_CONFIG constant with:
 * - NODE_ENV: Node environment ('development' default).
 * - PORT: Server port (3000 default). 
 * - DATABASE_URL: Database URL based on NODE_ENV.
 */

import dotenv from 'dotenv';
dotenv.config();

const SERVER_CONFIG = {
    NODE_ENV: process.env.NODE_ENV || 'development',
    PORT: process.env.PORT || 3000,
    DATABASE_URL: () => process.env.NODE_ENV === "development" ? process.env.DEV_DATABASE_URL : process.env.PROD_DATABASE_URL,
}

export {
    SERVER_CONFIG
}