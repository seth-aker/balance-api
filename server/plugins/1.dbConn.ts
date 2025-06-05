import knex, { Knex } from "knex";
import oracledb from "oracledb";
import { Kysely } from "kysely"
import { generate, OracleDialect } from 'kysely-oracledb'
import path from "path";
import { fileURLToPath } from "url";

declare module 'h3' {
    interface H3EventContext {
        knex: Knex,
        db: Kysely<DB>
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
        console.log("[ORACLEDB] Setting up Kysely")
       
        console.log('[Kysely] Generating types')
        generate({
            pool: await oracledb.createPool({
                user,
                password,
                connectString
            }),
            generator: {
                filePath: path.join(path.dirname(fileURLToPath(import.meta.url)), 'db-types.ts'),
                checkDiff: true,
                camelCase: true,
            }
        })
        const db = new Kysely({
            dialect: new OracleDialect({
                pool: await oracledb.createPool({
                    user,
                    password,
                    connectString
                })
            })
        })
        console.log("[ORACLEDB] Kysely connnected")
        console.log("[ORACLEDB] Setting up knex")
        const _knex = knex({
            client: 'oracledb',
            connection: {
                user,
                password,
                connectString
            }
        })
        console.log("[ORACLEDB] Knex connnected")
        nitroApp.hooks.hook('request', (event) => {
            event.context.knex = _knex;
            event.context.db = db;
        });
        console.log(`[ORACLEDB] Connected to database.`)

        nitroApp.hooks.hook('close', async () => {
            console.log(`[ORACLEDB] Disconnecting from database...`)
            await _knex.destroy()
            await db.destroy()
            console.log(`[ORACLEDB] Disconnected from database.`)
        })
    } catch (error) {
        console.error(`[ORACLEDB] Error connecting to database`)
        console.debug(error)
    }
    
})