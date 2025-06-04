export default defineEventHandler(async (event) => {
    const knex = event.context.knex;
    const user = await readBody(event); // TODO: create object validator to protect route.
    try {
        const res = await knex('users').insert({...user, userId: knex.fn.uuid()}, ['userId']);
        if(res.length === 0) {
            createError({
                status: 500,
                statusMessage: "Unable to create user"
            })
        } else {
            return res[0]
        }
    } catch (error) {
        console.error(error)
        createError(error)
    }
})
