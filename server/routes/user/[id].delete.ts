export default defineEventHandler(async (event) => {
    const knex = event.context.knex;
    const userId = getRouterParam(event, 'id');
    try {
        const res = await knex('users').where({userId: userId}).del();
        if(res !== 1) {
            createError({
                statusCode: 500,
                statusMessage: "Error deleting user"
            })
        }
    } catch (error) {
        console.error(error)
        createError(error)
    }
})
