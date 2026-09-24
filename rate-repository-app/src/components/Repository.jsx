import {
  View,
  Text,
  StyleSheet,
  Pressable,
  FlatList,
} from 'react-native'
import { useParams } from 'react-router-native'
import * as Linking from 'expo-linking'

import RepositoryItem from './RepositoryItem'
import useRepository from '../hooks/useRepository'

const ReviewItem = ({ review }) => {
  return (
    <View style={styles.reviewContainer}>
      {/* Rating */}
      <View style={styles.ratingContainer}>
        <Text style={styles.ratingText}>
          {review.rating}
        </Text>
      </View>

      {/* Review content */}
      <View style={styles.reviewContent}>
        <Text style={styles.username}>
          {review.user?.username}
        </Text>

        <Text style={styles.date}>
          {new Date(review.createdAt).toLocaleDateString()}
        </Text>

        <Text style={styles.reviewText}>
          {review.text}
        </Text>
      </View>
    </View>
  )
}

const Repository = () => {
  const { id } = useParams()

  const {
    repository,
    loading,
    error,
  } = useRepository(id)

  // Loading state
  if (loading) {
    return (
      <View style={styles.center}>
        <Text>Loading repository...</Text>
      </View>
    )
  }

  // Error state
  if (error) {
    return (
      <View style={styles.center}>
        <Text>Could not load repository.</Text>
        <Text>{error.message}</Text>
      </View>
    )
  }

  // No repository
  if (!repository) {
    return (
      <View style={styles.center}>
        <Text>Repository not found.</Text>
      </View>
    )
  }

  // Get reviews from GraphQL response
  const reviews =
    repository.reviews?.edges?.map(
      (edge) => edge.node
    ) || []

  // Open GitHub repository
  const openRepository = async () => {
    console.log('GitHub URL:', repository.url)

    try {
      await Linking.openURL(repository.url)
    } catch (e) {
      console.log('OPEN URL ERROR:', e)
    }
  }

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => (
        <ReviewItem review={item} />
      )}
      keyExtractor={(item) => item.id}

      ListHeaderComponent={() => (
        <View>
          {/* Repository information */}
          <RepositoryItem
            repository={repository}
          />

          {/* GitHub button */}
          <Pressable
            style={styles.button}
            onPress={openRepository}
          >
            <Text style={styles.buttonText}>
              Open in GitHub
            </Text>
          </Pressable>
        </View>
      )}

      // Space between reviews
      ItemSeparatorComponent={() => (
        <View style={styles.separator} />
      )}
    />
  )
}

const styles = StyleSheet.create({
  center: {
    padding: 20,
    alignItems: 'center',
  },

  button: {
    margin: 15,
    padding: 15,
    backgroundColor: '#0366d6',
    borderRadius: 5,
    alignItems: 'center',
  },

  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },

  reviewContainer: {
    flexDirection: 'row',
    padding: 15,
  },

  ratingContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },

  ratingText: {
    fontSize: 16,
    fontWeight: 'bold',
  },

  reviewContent: {
    flex: 1,
    marginLeft: 15,
  },

  username: {
    fontSize: 16,
    fontWeight: 'bold',
  },

  date: {
    color: '#666',
    marginTop: 3,
  },

  reviewText: {
    marginTop: 10,
    fontSize: 15,
  },

  separator: {
    height: 1,
    backgroundColor: '#ddd',
  },
})

export default Repository