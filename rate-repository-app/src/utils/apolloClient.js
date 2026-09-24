import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import Constants from 'expo-constants';

import AuthStorage from './authStorage';

const localhost = Constants.expoConfig?.hostUri
  ? Constants.expoConfig.hostUri.split(':').shift()
  : 'localhost';

const httpLink = createHttpLink({
  uri: `http://${localhost}:4000/graphql`,
});

const authStorage = new AuthStorage();

const authLink = setContext(async (_, { headers }) => {
  const accessToken = await authStorage.getAccessToken();

  return {
    headers: {
      ...headers,
      authorization: accessToken ? `Bearer ${accessToken}` : '',
    },
  };
});

const createApolloClient = () => {
  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;