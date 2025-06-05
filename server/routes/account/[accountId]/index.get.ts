export default defineEventHandler(async (event) => {
    const knex = event.context.knex;
    const accountId = getRouterParam(event, 'accountId');
    try {
        const res = await knex('accounts').where({accountId: accountId});
        if(res.length !== 1) {
            throw createError({
                statusCode: 500,
                statusMessage: "Unable to locate account with id " + accountId
            })
        }

    } catch (error) {
        console.error(error);
        throw createError(error)
    }
})
