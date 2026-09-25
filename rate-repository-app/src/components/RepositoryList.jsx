import { useState } from 'react'
import {
  FlatList,
  StyleSheet,
  View,
  Text,
  Pressable,
} from 'react-native'
import { useNavigate } from 'react-router-native'
import { Picker } from '@react-native-picker/picker'

import RepositoryItem from './RepositoryItem'
import useRepositories from '../hooks/useRepositories'

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },

  center: {
    padding: 20,
  },

  pickerContainer: {
    marginBottom: 10,
  },
})

export const RepositoryListContainer = ({ repositories }) => {
  const navigate = useNavigate()

  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : []

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={() => (
        <View style={styles.separator} />
      )}
      renderItem={({ item }) => (
        <Pressable
          onPress={() => navigate(`/repositories/${item.id}`)}
        >
          <RepositoryItem repository={item} />
        </Pressable>
      )}
      keyExtractor={(item) => item.id}
    />
  )
}

const RepositoryList = () => {
  const navigate = useNavigate()

  const [orderBy, setOrderBy] = useState('CREATED_AT')
  const [orderDirection, setOrderDirection] = useState('DESC')

  const variables = {
    orderBy,
    orderDirection,
  }

  const { repositories, loading, error } =
    useRepositories(variables)

  if (loading) {
    return (
      <View style={styles.center}>
        <Text>Loading repositories...</Text>
      </View>
    )
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text>Could not load repositories.</Text>
        <Text>{error.message}</Text>
      </View>
    )
  }

  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : []

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={() => (
        <View style={styles.separator} />
      )}
      renderItem={({ item }) => (
        <Pressable
          onPress={() => navigate(`/repositories/${item.id}`)}
        >
          <RepositoryItem repository={item} />
        </Pressable>
      )}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={`${orderBy}-${orderDirection}`}
            onValueChange={(value) => {
              if (value === 'CREATED_AT-DESC') {
                setOrderBy('CREATED_AT')
                setOrderDirection('DESC')
              }

              if (value === 'RATING_AVERAGE-DESC') {
                setOrderBy('RATING_AVERAGE')
                setOrderDirection('DESC')
              }

              if (value === 'RATING_AVERAGE-ASC') {
                setOrderBy('RATING_AVERAGE')
                setOrderDirection('ASC')
              }
            }}
          >
            <Picker.Item
              label="Latest repositories"
              value="CREATED_AT-DESC"
            />

            <Picker.Item
              label="Highest rated repositories"
              value="RATING_AVERAGE-DESC"
            />

            <Picker.Item
              label="Lowest rated repositories"
              value="RATING_AVERAGE-ASC"
            />
          </Picker>
        </View>
      }
    />
  )
}

export default RepositoryList