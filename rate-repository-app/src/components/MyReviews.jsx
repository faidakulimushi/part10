import { useQuery } from '@apollo/client'
import { FlatList, StyleSheet, View } from 'react-native'

import { GET_CURRENT_USER } from '../graphql/queries'
import Text from './Text'

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
  },

  review: {
    backgroundColor: 'white',
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
  },

  repository: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },

  text: {
    marginBottom: 8,
  },

  rating: {
    fontWeight: 'bold',
    marginBottom: 8,
  },

  date: {
    color: '#666',
  },

  center: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
})

const MyReviews = () => {
  const { data, loading, error } = useQuery(GET_CURRENT_USER, {
    variables: {
      includeReviews: true,
    },
  })

  if (loading) {
    return (
      <View style={styles.center}>
        <Text>Loading reviews...</Text>
      </View>
    )
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text>Could not load your reviews.</Text>
        <Text>{error.message}</Text>
      </View>
    )
  }

  const reviews = data?.me?.reviews?.edges || []

  if (reviews.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={styles.title}>My reviews</Text>
        <Text>You have no reviews yet.</Text>
      </View>
    )
  }

  return (
    <FlatList
      contentContainerStyle={styles.container}
      data={reviews}
      keyExtractor={({ node }) => node.id}
      ListHeaderComponent={
        <Text style={styles.title}>My reviews</Text>
      }
      renderItem={({ item }) => {
        const review = item.node

        return (
          <View style={styles.review}>
            <Text style={styles.repository}>
              {review.repository?.fullName || 'Repository'}
            </Text>

            <Text style={styles.text}>
              {review.text}
            </Text>

            <Text style={styles.rating}>
              Rating: {review.rating}/100
            </Text>

            <Text style={styles.date}>
              {new Date(review.createdAt).toLocaleDateString()}
            </Text>
          </View>
        )
      }}
    />
  )
}

export default MyReviews