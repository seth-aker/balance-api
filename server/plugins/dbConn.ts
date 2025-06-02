import oracledb from 'oracledb'

declare module 'h3' {
    interface H3EventContext {
        db: oracledb.Connection
    }
  }
export default defineNitroPlugin(async (nitroApp) => {
    const config = useRuntimeConfig();
    const user = config.databaseUser;
    const password = config.databasePassword;
    const connectString = config.databaseConnectionString;
    if(!user || !password || !connectString) {
        console.warn('[ORACLEDB] Required fields not provided. Skipping  database connection.');
        return;
    }
    try {
        console.log(`[ORACLEDB] Connecting to database...`)
        const db = await oracledb.getConnection({
            user,
            password,
            connectString
        });
        nitroApp.hooks.hook('request', (event) => {
            event.context.db = db;
        });
        console.log(`[ORACLEDB] Connected to database.`)

        nitroApp.hooks.hook('close', async () => {
            console.log(`[ORACLEDB] Disconnecting from database...`)
            await db.close();
            console.log(`[ORACLEDB] Disconnected from database.`)
        })
    } catch (error) {
        console.error(`[ORACLEDB] Error connecting to database`)
        console.debug(error)
    }
    
})