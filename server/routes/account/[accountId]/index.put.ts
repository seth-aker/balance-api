export default defineEventHandler(async (event) => {
    const knex = event.context.knex;
    const body = await readBody(event);
    const accountId = getRouterParam(event, 'accountId');
    try{
        const res = await knex('accounts').update(body).where({accountId: accountId})
        if(res <= 0) {
            throw createError({
                statusCode: 500,
                statusMessage: "An error occurred when updating account"
            })
        } else {
            return 201
        }
    } catch (error) {
        console.error(error)
        throw createError(error)
    }
})
