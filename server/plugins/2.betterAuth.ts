import { betterAuth } from "better-auth";
import { OracleAdapter, OracleDialect } from "kysely-oracledb";
import OracleDB from "oracledb";

export default defineNitroPlugin(async (nitroApp) => {
    const config = useRuntimeConfig();

    const user = config.databaseUser;
    const password = config.databasePassword;
    const connectString = config.databaseConnectionString;
    if(!user || !password || !connectString) {
        console.warn('[ORACLEDB AUTH] Required fields not provided. Skipping  database connection.');
        return;
    }
    const dialect = new OracleDialect({
        pool: await OracleDB.createPool({
            user,
            password,
            connectString
        })
    })
    const auth = betterAuth({
        database: { 
            dialect, 
            type: 'oracledb'
        }
    })
    
    nitroApp.hooks.hook('request', (event) => {
        event.context.auth = auth;
    });
})