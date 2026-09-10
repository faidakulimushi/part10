import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import Constants from 'expo-constants';

// Extract your computer's local IP dynamically from Expo manifest
const localhost = Constants.expoConfig?.hostUri
  ? Constants.expoConfig.hostUri.split(':').shift()
  : 'localhost';

const httpLink = createHttpLink({
  // Use computer IP for physical phone / Expo Go
  uri: `http://${localhost}:4000/graphql`,
});

const createApolloClient = () => {
  return new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;