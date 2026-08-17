import { StyleSheet, Text } from "react-native";
import { useField } from "formik";

import TextInput from "./TextInput";

const FormikTextInput = ({ name, ...props }) => {
  const [field, meta, helpers] = useField(name);

  const showError = meta.touched && meta.error;

  return (
    <>
      <TextInput
        {...props}
        value={field.value}
        onChangeText={helpers.setValue}
        onBlur={() => helpers.setTouched(true)}
        error={showError}
      />

      {showError && (
        <Text style={styles.errorText}>
          {meta.error}
        </Text>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  errorText: {
    color: "#c44555",
    fontSize: 16,
    marginBottom: 15,
  },
});

export default FormikTextInput;