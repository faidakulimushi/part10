import { gql, useMutation } from '@apollo/client'

import AuthStorage from '../utils/authStorage'

const AUTHENTICATE = gql`
  mutation Authenticate($credentials: AuthenticateInput) {
    authenticate(credentials: $credentials) {
      accessToken
    }
  }
`

const useSignIn = () => {
  const [mutate, result] = useMutation(AUTHENTICATE)
  const authStorage = new AuthStorage()

  const signIn = async ({ username, password }) => {
    const response = await mutate({
      variables: {
        credentials: {
          username,
          password,
        },
      },
    })

    const accessToken = response.data.authenticate.accessToken

    await authStorage.setAccessToken(accessToken)

    return response
  }

  return [signIn, result]
}

export default useSignIn