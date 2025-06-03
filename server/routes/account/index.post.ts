export default defineEventHandler(async (event) => {
    const knex = event.context.knex;
    const body = await readBody(event);
    const res = await knex('accounts').insert({...body, accountId: knex.fn.uuid()}, ['accountId']);
    if(res.length === 0) {
        createError({
            status: 500,
            statusMessage: "Unable to create account"
        })
    } else {
        return res[0]
    }
})