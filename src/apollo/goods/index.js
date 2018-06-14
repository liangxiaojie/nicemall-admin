import goodsesGQL from './goodses.gql'
import createGoodsGQL from './createGoods.gql'
import updateGoodsGQL from './updateGoods.gql'
import deleteGoodsGQL from './deleteGoods.gql'

export async function getGoodses(client, listQuery) {
  const { data } = await client.query({
    query: goodsesGQL,
    variables: listQuery,
  })
  return data;
}

export async function createGoods(client, goods) {
  const { data } = await client.mutate({
    mutation: createGoodsGQL,
    variables: goods,
  });
  return data;
}

export async function updateGoods(client, goods) {
  const { data } = await client.mutate({
    mutation: updateGoodsGQL,
    variables: goods,
  });
  return data;
}

export async function deleteGoods(client, _id) {
  const { data } = await client.mutate({
    mutation: deleteGoodsGQL,
    variables: {
      _id,
    },
  });
  return data;
}

export default {
  getGoodses,
  createGoods,
  updateGoods,
  deleteGoods,
}
