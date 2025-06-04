export default defineEventHandler(async (event) => {
    const knex = event.context.knex;
    const userId = getRouterParam(event, 'id');
    const user = await readBody(event);
    try {
        await knex('users').where({userid: userId}).update({...user, updatedAt: knex.fn.now() })
    } catch (error) {
        console.error(error)
        createError(error)
    }
})
