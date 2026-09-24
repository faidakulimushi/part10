
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native'
import { Formik } from 'formik'
import * as yup from 'yup'
import { useMutation } from '@apollo/client'
import { useNavigate } from 'react-router-native'

import { CREATE_REVIEW } from '../graphql/mutations'

const validationSchema = yup.object().shape({
  ownerUsername: yup
    .string()
    .required('Repository owner username is required'),

  repositoryName: yup
    .string()
    .required('Repository name is required'),

  rating: yup
    .number()
    .typeError('Rating must be a number')
    .required('Rating is required')
    .min(0, 'Rating must be between 0 and 100')
    .max(100, 'Rating must be between 0 and 100'),

  review: yup.string(),
})

const CreateReview = () => {
  const [createReview] = useMutation(CREATE_REVIEW)
  const navigate = useNavigate()

  const onSubmit = async (values, { setSubmitting, setStatus }) => {
    setStatus(null)

    try {
      const { data } = await createReview({
        variables: {
          repositoryName: values.repositoryName.trim(),
          ownerUsername: values.ownerUsername.trim(),
          rating: Number(values.rating),
          text: values.review.trim(),
        },
      })

      if (data?.createReview?.repositoryId) {
        navigate(`/repositories/${data.createReview.repositoryId}`)
      } else {
        setStatus('Review was not created. Please try again.')
      }
    } catch (error) {
      console.log('Create review error:', error)

      const message =
        error?.graphQLErrors?.[0]?.message ||
        error?.networkError?.message ||
        error?.message ||
        'Creating the review failed.'

      setStatus(message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Formik
      initialValues={{
        ownerUsername: '',
        repositoryName: '',
        rating: '',
        review: '',
      }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
        isSubmitting,
        status,
      }) => (
        <View style={styles.container}>
          <TextInput
            style={styles.input}
            placeholder="Repository owner username"
            value={values.ownerUsername}
            onChangeText={handleChange('ownerUsername')}
            onBlur={handleBlur('ownerUsername')}
            autoCapitalize="none"
          />

          {touched.ownerUsername && errors.ownerUsername && (
            <Text style={styles.error}>{errors.ownerUsername}</Text>
          )}

          <TextInput
            style={styles.input}
            placeholder="Repository name"
            value={values.repositoryName}
            onChangeText={handleChange('repositoryName')}
            onBlur={handleBlur('repositoryName')}
            autoCapitalize="none"
          />

          {touched.repositoryName && errors.repositoryName && (
            <Text style={styles.error}>{errors.repositoryName}</Text>
          )}

          <TextInput
            style={styles.input}
            placeholder="Rating between 0 and 100"
            value={values.rating}
            onChangeText={handleChange('rating')}
            onBlur={handleBlur('rating')}
            keyboardType="numeric"
          />

          {touched.rating && errors.rating && (
            <Text style={styles.error}>{errors.rating}</Text>
          )}

          <TextInput
            style={[styles.input, styles.reviewInput]}
            placeholder="Review"
            value={values.review}
            onChangeText={handleChange('review')}
            onBlur={handleBlur('review')}
            multiline
          />

          {status && <Text style={styles.error}>{status}</Text>}

          <Pressable
            style={[
              styles.button,
              isSubmitting && styles.buttonDisabled,
            ]}
            onPress={() => handleSubmit()}
            disabled={isSubmitting}
          >
            <Text style={styles.buttonText}>
              {isSubmitting ? 'Creating...' : 'Create review'}
            </Text>
          </Pressable>
        </View>
      )}
    </Formik>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },

  input: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 12,
    marginBottom: 5,
    fontSize: 16,
  },

  reviewInput: {
    height: 120,
    textAlignVertical: 'top',
  },

  error: {
    color: 'red',
    marginBottom: 10,
  },

  button: {
    backgroundColor: '#0366d6',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },

  buttonDisabled: {
    opacity: 0.5,
  },

  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
})

export default CreateReview

