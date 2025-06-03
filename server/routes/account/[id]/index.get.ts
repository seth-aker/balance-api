export default defineEventHandler(async (event) => {
    const knex = event.context.knex;
    const id = getRouterParam(event, 'id');
    try {
        const res = await knex('accounts').where({accountId: id});
        if(res.length !== 1) {
            createError({
                statusCode: 500,
                statusMessage: "Unable to locate account with id " + id
            })
        }

    } catch (error) {
        console.error(error);
        createError(error)
    }
})