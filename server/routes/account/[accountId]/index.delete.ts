export default defineEventHandler(async (event) => {
    const knex = event.context.knex;
    const accountId = getRouterParam(event, 'accountId');
    try {
        const res = await knex('accounts').where({accountId: accountId}).del();
        if(res !== 1) {
            throw createError({
                statusCode: 500,
                statusMessage: "Error deleting account"
            })
        }
    } catch (error) {
        console.error(error);
        throw createError(error)
    }
})
