import Vue from 'vue'
import Cookies from 'js-cookie';
import { ApolloClient } from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import VueApollo from 'vue-apollo'
import { API_URL } from '@/config'

Vue.use(VueApollo)

const httpLink = new HttpLink({
  // You should use an absolute URL here
  uri: `${API_URL}/graphql`,
})

const middlewareLink = new ApolloLink((operation, forward) => {
  const token = Cookies.get('csrfToken');
  if (token) {
    operation.setContext({
      headers: {
        'x-csrf-token': token,
      },
    })
  }
  return forward(operation)
})
const link = middlewareLink.concat(httpLink)

// Create the apollo client
const apolloClient = new ApolloClient({
  link,
  cache: new InMemoryCache(),
  connectToDevTools: true,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'network-only',
      errorPolicy: 'ignore',
    },
    query: {
      fetchPolicy: 'network-only',
      errorPolicy: 'all',
    },
    mutate: {
      errorPolicy: 'all',
    },
  },
})

export default new VueApollo({
  defaultClient: apolloClient,
})
