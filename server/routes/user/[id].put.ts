export default defineEventHandler(async (event) => {

    const knex = event.context.knex;
    const userId = getRouterParam(event, 'id');
    const user = await readBody(event); // TODO: create object validator to protect route.
    await knex('users').where({userid: userId}).update({...user, updatedAt: knex.fn.now() })
})