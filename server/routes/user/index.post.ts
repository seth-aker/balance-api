export default defineEventHandler(async (event) => {
    const knex = event.context.knex;
    const userId = event.context.accessToken.sub;
    const user = await readBody(event); // TODO: create object validator to protect route.
    try {
        const res = await knex('users').insert({...user, userId: userId}, ['userId']);
        if(res.length === 0) {
            throw createError({
                status: 500,
                statusMessage: "Unable to create user"
            })
        } else {
            return res[0]
        }
    } catch (error) {
        console.error(error)
        throw createError(error)
    }
})
