import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: 'white',
  },
  fullName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    fontSize: 16,
    marginBottom: 8,
  },
  language: {
    color: 'white',
    backgroundColor: '#0366d6',
    alignSelf: 'flex-start',
    padding: 5,
    borderRadius: 5,
    marginBottom: 10,
  },
  statistics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statistic: {
    alignItems: 'center',
  },
  statisticValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  statisticLabel: {
    fontSize: 14,
  },
});

const RepositoryItem = ({ repository }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.fullName}>{repository.fullName}</Text>

      <Text style={styles.description}>{repository.description}</Text>

      <Text style={styles.language}>{repository.language}</Text>

      <View style={styles.statistics}>
        <View style={styles.statistic}>
          <Text style={styles.statisticValue}>
            {repository.stargazersCount}
          </Text>
          <Text style={styles.statisticLabel}>Stars</Text>
        </View>

        <View style={styles.statistic}>
          <Text style={styles.statisticValue}>
            {repository.forksCount}
          </Text>
          <Text style={styles.statisticLabel}>Forks</Text>
        </View>

        <View style={styles.statistic}>
          <Text style={styles.statisticValue}>
            {repository.reviewCount}
          </Text>
          <Text style={styles.statisticLabel}>Reviews</Text>
        </View>

        <View style={styles.statistic}>
          <Text style={styles.statisticValue}>
            {repository.ratingAverage}
          </Text>
          <Text style={styles.statisticLabel}>Rating</Text>
        </View>
      </View>
    </View>
  );
};

export default RepositoryItem;