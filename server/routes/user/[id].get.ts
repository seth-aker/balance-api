export default defineEventHandler(async (event) => {
    const knex = event.context.knex;
    const userId = getRouterParam(event, 'id');
    try {
        const res = await knex('users').select().where('userId', userId)
        return res[0]
    } catch (error) {
        console.error(error)
        createError(error)
    }
})
