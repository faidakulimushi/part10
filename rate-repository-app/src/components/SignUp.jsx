
import { View, StyleSheet, Pressable } from 'react-native'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-native'

import FormikTextInput from './FormikTextInput'
import Text from './Text'
import useSignUp from '../hooks/useSignUp'
import useSignIn from '../hooks/useSignIn'

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .required('Username is required')
    .min(5, 'Username must be at least 5 characters')
    .max(30, 'Username must be at most 30 characters'),

  password: Yup.string()
    .required('Password is required')
    .min(5, 'Password must be at least 5 characters')
    .max(50, 'Password must be at most 50 characters'),

  passwordConfirmation: Yup.string()
    .required('Password confirmation is required')
    .oneOf(
      [Yup.ref('password')],
      'Password confirmation does not match'
    ),
})

export const SignUpForm = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={{
        username: '',
        password: '',
        passwordConfirmation: '',
      }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ handleSubmit }) => (
        <View style={styles.container}>
          <FormikTextInput
            name="username"
            placeholder="Username"
          />

          <FormikTextInput
            name="password"
            placeholder="Password"
            secureTextEntry
          />

          <FormikTextInput
            name="passwordConfirmation"
            placeholder="Password confirmation"
            secureTextEntry
          />

          <Pressable
            style={styles.button}
            onPress={handleSubmit}
          >
            <Text style={styles.buttonText}>Submit</Text>
          </Pressable>
        </View>
      )}
    </Formik>
  )
}

const SignUp = () => {
  const [signUp] = useSignUp()
  const [signIn] = useSignIn()
  const navigate = useNavigate()

  const onSubmit = async ({ username, password }) => {
    console.log('SIGN UP SUBMITTED')

    try {
      console.log('Creating user...')

      await signUp({
        username,
        password,
      })

      console.log('User created successfully')

      await signIn({
        username,
        password,
      })

      console.log('Signed in successfully')

      navigate('/')
    } catch (error) {
      console.log('SIGN UP ERROR:', error)
    }
  }

  return <SignUpForm onSubmit={onSubmit} />
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },

  button: {
    backgroundColor: '#0366d6',
    padding: 15,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },

  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
})

export default SignUp

