export default defineEventHandler(async (event) => {
  const knex = event.context.knex;
  const {accountId, transactionId} = getRouterParams(event, {decode: true});
  try {
    const res = await knex('transactions').select('transactionId', 'createdBy', 'amountCents', 'description', 'type', 'paid', 'createdAt').where({accountId, transactionId}).first()
    return res
  } catch (error) {
    console.error(error)
    createError(error)
  }
})
