import { gql } from '@apollo/client'

export const GET_REPOSITORIES = gql`
  query repositories(
    $orderBy: AllRepositoriesOrderBy
    $orderDirection: OrderDirection
    $searchKeyword: String
  ) {
    repositories(
      orderBy: $orderBy
      orderDirection: $orderDirection
      searchKeyword: $searchKeyword
    ) {
      edges {
        node {
          id
          fullName
          description
          language
          forksCount
          stargazersCount
          reviewCount
          ratingAverage
          ownerAvatarUrl
          url
        }
      }
    }
  }
`

export const GET_REPOSITORY = gql`
  query Repository($repositoryId: ID!) {
    repository(id: $repositoryId) {
      id
      fullName
      description
      language
      forksCount
      stargazersCount
      reviewCount
      ratingAverage
      ownerAvatarUrl
      url

      reviews {
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              username
            }
          }
        }
      }
    }
  }
`