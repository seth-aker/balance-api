export default defineEventHandler(async (event) => {
    const knex = event.context.knex;
    const id = getRouterParam(event, 'id');
    try {
        const res = await knex('accounts').where({accountId: id}).del();
        if(res !== 1) {
            createError({
                statusCode: 500,
                statusMessage: "Error deleting account"
            })
        }
    } catch (error) {
        console.error(error);
        createError(error)
    }
})