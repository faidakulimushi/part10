import { View, Text, StyleSheet, Image } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 15,
    flexDirection: 'row',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 5,
    marginRight: 15,
  },
  content: {
    flex: 1,
  },
  fullName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    fontSize: 16,
    color: '#586069',
    marginBottom: 10,
  },
  language: {
    color: 'white',
    backgroundColor: '#0366d6',
    alignSelf: 'flex-start',
    padding: 5,
    borderRadius: 5,
    marginBottom: 15,
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
    color: '#586069',
  },
});

const formatCount = (count) => {
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}k`;
  }

  return count.toString();
};

const RepositoryItem = ({ repository }) => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.avatar}
        source={{ uri: repository.ownerAvatarUrl }}
      />

      <View style={styles.content}>
        <Text style={styles.fullName}>{repository.fullName}</Text>

        <Text style={styles.description}>
          {repository.description}
        </Text>

        <Text style={styles.language}>
          {repository.language}
        </Text>

        <View style={styles.statistics}>
          <View style={styles.statistic}>
            <Text style={styles.statisticValue}>
              {formatCount(repository.stargazersCount)}
            </Text>
            <Text style={styles.statisticLabel}>Stars</Text>
          </View>

          <View style={styles.statistic}>
            <Text style={styles.statisticValue}>
              {formatCount(repository.forksCount)}
            </Text>
            <Text style={styles.statisticLabel}>Forks</Text>
          </View>

          <View style={styles.statistic}>
            <Text style={styles.statisticValue}>
              {formatCount(repository.reviewCount)}
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
    </View>
  );
};

export default RepositoryItem;