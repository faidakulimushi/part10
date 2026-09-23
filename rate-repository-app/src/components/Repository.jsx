
import { View, Text, StyleSheet, Pressable } from 'react-native'
import { useParams } from 'react-router-native'
import * as Linking from 'expo-linking'

import RepositoryItem from './RepositoryItem'
import useRepository from '../hooks/useRepository'

const Repository = () => {
  const { id } = useParams()
  const { repository, loading, error } = useRepository(id)

  if (loading) {
    return (
      <View style={styles.center}>
        <Text>Loading repository...</Text>
      </View>
    )
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text>Could not load repository.</Text>
        <Text>{error.message}</Text>
      </View>
    )
  }

  if (!repository) {
    return null
  }

  const openRepository = async () => {
    console.log('GitHub URL:', repository.url)

    try {
      await Linking.openURL(repository.url)
    } catch (e) {
      console.log('OPEN URL ERROR:', e)
    }
  }

  return (
    <View style={styles.container}>
      <RepositoryItem repository={repository} />

      <Pressable
        style={styles.button}
        onPress={openRepository}
      >
        <Text style={styles.buttonText}>
          Open in GitHub
        </Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  center: {
    padding: 20,
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
})

export default Repository

