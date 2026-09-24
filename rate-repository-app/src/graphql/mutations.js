import { gql } from '@apollo/client'

export const CREATE_REVIEW = gql`
  mutation CreateReview(
    $repositoryName: String!
    $ownerUsername: String!
    $rating: Int!
    $text: String
  ) {
    createReview(
      repositoryName: $repositoryName
      ownerUsername: $ownerUsername
      rating: $rating
      text: $text
    ) {
      repositoryId
    }
  }
`