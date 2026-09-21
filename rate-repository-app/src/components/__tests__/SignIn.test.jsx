
import {
  render,
  screen,
  fireEvent,
  waitFor,
} from '@testing-library/react-native'
import { Formik } from 'formik'

import { SignInForm } from '../SignIn'

describe('SignIn', () => {
  describe('SignInContainer', () => {
    it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {
      const onSubmit = jest.fn()

      await render(
        <Formik
          initialValues={{
            username: '',
            password: '',
          }}
          onSubmit={onSubmit}
        >
          {({ handleSubmit }) => (
            <SignInForm onSubmit={handleSubmit} />
          )}
        </Formik>,
      )

      fireEvent.changeText(
        screen.getByPlaceholderText('Username'),
        'johndoe',
      )

      fireEvent.changeText(
        screen.getByPlaceholderText('Password'),
        'password123',
      )

      fireEvent.press(screen.getByText('Sign in'))

      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledTimes(1)

        expect(onSubmit.mock.calls[0][0]).toEqual({
          username: 'johndoe',
          password: 'password123',
        })
      })
    })
  })
})
