import knex, { Knex } from "knex";
declare module 'h3' {
    interface H3EventContext {
        knex: Knex
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
        const _knex = knex({
            client: 'oracledb',
            connection: {
                user,
                password,
                connectString
            }
        })
        nitroApp.hooks.hook('request', (event) => {
            event.context.knex = _knex;
        });
        console.log(`[ORACLEDB] Connected to database.`)

        nitroApp.hooks.hook('close', async () => {
            console.log(`[ORACLEDB] Disconnecting from database...`)
            await _knex.destroy()
            console.log(`[ORACLEDB] Disconnected from database.`)
        })
    } catch (error) {
        console.error(`[ORACLEDB] Error connecting to database`)
        console.debug(error)
    }
    
})