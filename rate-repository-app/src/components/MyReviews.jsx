
import { useQuery, useMutation } from '@apollo/client'
import { View, Text, StyleSheet, Pressable } from 'react-native'
import { useNavigate } from 'react-router-native'

import { GET_CURRENT_USER } from '../graphql/queries'
import { DELETE_REVIEW } from '../graphql/mutations'

const MyReviews = () => {
  const navigate = useNavigate()

  const [deleteReview,
 { loading: deleting }] = useMutation(DELETE_REVIEW)

  const { data, loading, error, refetch } = useQuery(GET_CURRENT_USER, {
    variables: {
      includeReviews: true,
    },
  })

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    )
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>Error: {error.message}</Text>
      </View>
    )
  }

  const reviews = data?.me?.reviews?.edges || []

  const handleDelete = async (reviewId) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this review?',
    )

    if (!confirmed) {
      return
    }

    try {
      console.log('DELETE BUTTON PRESSED')
      console.log('REVIEW ID:', reviewId)

      await deleteReview({
        variables: {
          id: reviewId,
        },
      })

      console.log('Review deleted successfully')

      await refetch()

      window.alert('Review deleted successfully.')
    } catch (error) {
      console.log('Delete error:', error)

      window.alert(
        `Delete failed: ${error.message || 'Something went wrong.'}`,
      )
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My reviews</Text>

      {reviews.length === 0 ? (
        <Text>You have no reviews.</Text>
      ) : (
        reviews.map(({ node }) => (
          <View key={node.id} style={styles.review}>
            <Text style={styles.repositoryName}>
              {node.repository.fullName}
            </Text>

            <Text style={styles.rating}>
              Rating: {node.rating}/100
            </Text>

            <Text style={styles.text}>
              {node.text}
            </Text>

            <Text style={styles.date}>
              {new Date(node.createdAt).toLocaleDateString()}
            </Text>

            <View style={styles.buttons}>
              <Pressable
                style={styles.viewButton}
                onPress={() =>
                  navigate(`/repositories/${node.repository.id}`)
                }
              >
                <Text style={styles.buttonText}>
                  View repository
                </Text>
              </Pressable>

              <Pressable
                style={styles.deleteButton}
                onPress={() => {
                  console.log('Delete button clicked')
                  handleDelete(node.id)
                }}
                disabled={deleting}
              >
                <Text style={styles.buttonText}>
                  {deleting ? 'Deleting...' : 'Delete review'}
                </Text>
              </Pressable>
            </View>
          </View>
        ))
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },

  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
  },

  review: {
    padding: 16,
    marginBottom: 16,
    backgroundColor: '#ffffff',
    borderRadius: 8,
  },

  repositoryName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },

  rating: {
    fontSize: 16,
    marginBottom: 8,
  },

  text: {
    fontSize: 15,
    marginBottom: 8,
  },

  date: {
    color: '#666',
    marginBottom: 12,
  },

  buttons: {
    flexDirection: 'row',
    gap: 8,
  },

  viewButton: {
    backgroundColor: '#0066cc',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 6,
    flex: 1,
  },

  deleteButton: {
    backgroundColor: '#d32f2f',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 6,
    flex: 1,
  },

  buttonText: {
    color: '#ffffff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
})

export default MyReviews

