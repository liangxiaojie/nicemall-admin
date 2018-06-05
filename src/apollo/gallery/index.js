import gallerys from './gallerys.gql'
import createGalleryGQL from './createGallery.gql'
import updateGalleryGQL from './updateGallery.gql'
import deleteGalleryGQL from './deleteGallery.gql'

export async function getGallerys(client) {
  const { data } = await client.query({
    query: gallerys,
  })
  return data;
}

export async function createGallery(client, gallery) {
  const { data } = await client.mutate({
    mutation: createGalleryGQL,
    variables: gallery,
  });
  return data;
}

export async function updateGallery(client, gallery) {
  const { data } = await client.mutate({
    mutation: updateGalleryGQL,
    variables: gallery,
  });
  return data;
}

export async function deleteGallery(client, _id) {
  const { data } = await client.mutate({
    mutation: deleteGalleryGQL,
    variables: {
      _id,
    },
  });
  return data;
}

export default {
  getGallerys,
}
