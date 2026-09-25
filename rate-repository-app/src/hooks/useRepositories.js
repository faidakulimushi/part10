import { useQuery } from '@apollo/client'

import { GET_REPOSITORIES } from '../graphql/queries'

const useRepositories = (variables) => {
  const { data, loading, error } = useQuery(GET_REPOSITORIES, {
    variables,
  })

  return {
    repositories: data ? data.repositories : null,
    loading,
    error,
  }
}

export default useRepositories