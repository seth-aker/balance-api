export default defineEventHandler(async (event) => {
    const knex = event.context.knex;
    const body = await readBody(event);
    const accountId = getRouterParam(event, 'id');
    try {
        const transactionId = await knex.transaction(async (trx) => {
            const transactionId = (await trx('transactions').insert({...body, transactionId: knex.fn.uuid()}, ['transactionId'])).at(0);
            await trx('account_transactions').insert({accountId: accountId, transactionId: transactionId});
            return transactionId;
        })
        return transactionId;
    } catch (error) {
        console.error(error);
        throw createError("There was an error please try again")
    }
})