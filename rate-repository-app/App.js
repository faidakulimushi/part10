import { StatusBar } from 'expo-status-bar';
import { NativeRouter } from 'react-router-native';
import { ApolloProvider } from '@apollo/client/react';

import Main from './src/components/Main';
import createApolloClient from './src/utils/apolloClient';

const client = createApolloClient();

const App = () => {
  return (
    <ApolloProvider client={client}>
      <StatusBar style="light" />

      <NativeRouter>
        <Main />
      </NativeRouter>
    </ApolloProvider>
  );
};

export default App;