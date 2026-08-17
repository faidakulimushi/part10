import { TextInput as NativeTextInput, StyleSheet } from "react-native";

const TextInput = ({ error, style, ...props }) => {
  return (
    <NativeTextInput
      style={[
        styles.input,
        style,
        error && styles.error,
      ]}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    height: 60,
    borderWidth: 1,
    borderColor: "#000000",
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 20,
    marginBottom: 5,
  },

  error: {
    borderColor: "#c44555",
  },
});

export default TextInput;