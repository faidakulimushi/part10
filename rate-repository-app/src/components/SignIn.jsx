import { Formik } from "formik";
import * as yup from "yup";
import {
  StyleSheet,
  View,
  Pressable,
  Text,
} from "react-native";

import FormikTextInput from "./FormikTextInput";

const initialValues = {
  username: "",
  password: "",
};

const validationSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

const SignIn = () => {
  const onSubmit = (values) => {
    console.log("SUCCESS! Form Values:", values);
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit, errors }) => (
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

          <Pressable
            style={styles.button}
            onPress={() => {
              console.log("SIGN IN BUTTON PRESSED");
              handleSubmit();
            }}
          >
            <Text style={styles.buttonText}>Sign in</Text>
          </Pressable>

          {Object.keys(errors).length > 0 && (
            <Text style={styles.debugText}>
              Errors: {JSON.stringify(errors)}
            </Text>
          )}
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },

  button: {
    height: 60,
    backgroundColor: "#0066cc",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },

  buttonText: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "bold",
  },

  debugText: {
    color: "red",
    marginTop: 15,
    fontSize: 14,
  },
});

export default SignIn;