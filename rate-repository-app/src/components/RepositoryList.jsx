import { FlatList, StyleSheet, View, Text } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  center: {
    padding: 20,
  },
});

export const RepositoryListContainer = ({ repositories }) => {
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      renderItem={({ item }) => (
        <RepositoryItem repository={item} />
      )}
      keyExtractor={(item) => item.id}
    />
  );
};

const RepositoryList = () => {
  const { repositories, loading, error } = useRepositories();

  if (loading) {
    return (
      <View style={styles.center}>
        <Text>Loading repositories...</Text>
      </View>
    );
  }

  if (error) {
  console.log('APOLLO ERROR:', error);
  console.log('APOLLO ERROR MESSAGE:', error.message);

  return (
    <View style={styles.center}>
      <Text>Could not load repositories.</Text>
      <Text>{error.message}</Text>
    </View>
  );
}

  return (
    <RepositoryListContainer repositories={repositories} />
  );
};

export default RepositoryList;