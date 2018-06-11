import users from './users.gql'

export async function getUsers(client) {
  const { data } = await client.query({
    query: users,
  })
  return data;
}

export default getUsers
