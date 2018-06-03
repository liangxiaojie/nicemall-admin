import gallerys from './gallerys.gql'

export async function getGallerys(client) {
  const { data } = await client.query({
    query: gallerys,
  })
  return data;
}

export default {
  getGallerys,
}
