import { useApolloClient, useQuery, gql } from '@apollo/client';
import { ScrollView, StyleSheet, View, Pressable } from 'react-native';
import { Link } from 'react-router-native';

import Text from './Text';
import AuthStorage from '../utils/authStorage';

const ME = gql`
  query Me {
    me {
      id
      username
    }
  }
`;

const AppBar = () => {
  const { data } = useQuery(ME);
  const apolloClient = useApolloClient();

  const authStorage = new AuthStorage();

  const signOut = async () => {
    await authStorage.removeAccessToken();
    await apolloClient.resetStore();
  };

  const isSignedIn = !!data?.me;

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        contentContainerStyle={styles.tabs}
        showsHorizontalScrollIndicator={false}
      >
        <Link style={styles.tab} to="/">
          <Text style={styles.text}>Repositories</Text>
        </Link>

        {isSignedIn ? (
          <Pressable style={styles.tab} onPress={signOut}>
            <Text style={styles.text}>Sign out</Text>
          </Pressable>
        ) : (
          <Link style={styles.tab} to="/signin">
            <Text style={styles.text}>Sign in</Text>
          </Link>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#24292e',
  },
  tabs: {
    paddingHorizontal: 15,
  },
  tab: {
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  text: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AppBar;