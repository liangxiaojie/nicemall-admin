import ordersGQL from './orders.gql'
import updateOrderGQL from './updateOrder.gql'

export async function getOrders(client, listQuery) {
  const { data } = await client.query({
    query: ordersGQL,
    variables: listQuery,
  })
  return data;
}

export async function updateOrder(client, order) {
  const { data } = await client.mutate({
    mutation: updateOrderGQL,
    variables: order,
  });
  return data;
}

export default {
  getOrders,
  updateOrder,
}
