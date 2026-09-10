import { View, Text, Image, StyleSheet } from 'react-native';

const formatCount = (count) => {
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}k`;
  }

  return String(count);
};

const RepositoryItem = ({ repository }) => {
  return (
    <View testID="repositoryItem" style={styles.container}>
      {/* Repository information */}
      <View style={styles.header}>
        <Image
          source={{ uri: repository.ownerAvatarUrl }}
          style={styles.avatar}
        />

        <View style={styles.info}>
          <Text style={styles.fullName}>
            {repository.fullName}
          </Text>

          <Text style={styles.description}>
            {repository.description}
          </Text>

          <Text style={styles.language}>
            {repository.language}
          </Text>
        </View>
      </View>

      {/* Repository statistics */}
      <View style={styles.statistics}>
        <View style={styles.stat}>
          <Text style={styles.statNumber}>
            {formatCount(repository.forksCount)}
          </Text>
          <Text style={styles.statLabel}>Forks</Text>
        </View>

        <View style={styles.stat}>
          <Text style={styles.statNumber}>
            {formatCount(repository.stargazersCount)}
          </Text>
          <Text style={styles.statLabel}>Stars</Text>
        </View>

        <View style={styles.stat}>
          <Text style={styles.statNumber}>
            {repository.ratingAverage}
          </Text>
          <Text style={styles.statLabel}>Rating</Text>
        </View>

        <View style={styles.stat}>
          <Text style={styles.statNumber}>
            {repository.reviewCount}
          </Text>
          <Text style={styles.statLabel}>Reviews</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 15,
  },

  header: {
    flexDirection: 'row',
  },

  avatar: {
    width: 55,
    height: 55,
    borderRadius: 4,
  },

  info: {
    flex: 1,
    marginLeft: 15,
  },

  fullName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },

  description: {
    fontSize: 14,
    marginBottom: 8,
  },

  language: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    overflow: 'hidden',
  },

  statistics: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },

  stat: {
    alignItems: 'center',
  },

  statNumber: {
    fontSize: 16,
    fontWeight: 'bold',
  },

  statLabel: {
    marginTop: 4,
    fontSize: 12,
  },
});

export default RepositoryItem;