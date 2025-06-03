export default defineEventHandler(async (event) => {
    const knex = event.context.knex;
    const body = await readBody(event);
    const id = getRouterParam(event, 'id');
    const res = await knex('accounts').update(body).where({accountId: id})
    if(res <= 0) {
        createError({
            statusCode: 500,
            statusMessage: "An error occurred when updating account"
        })
    } else {
        return 201
    }
})