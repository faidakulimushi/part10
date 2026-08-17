import { StyleSheet, View, ScrollView, Text } from "react-native";
import { Link } from "react-router-native";

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        contentContainerStyle={styles.tabs}
        showsHorizontalScrollIndicator={false}
      >
        <Link style={styles.tab} to="/">
          <Text style={styles.text}>Repositories</Text>
        </Link>

        <Link style={styles.tab} to="/signin">
          <Text style={styles.text}>Sign in</Text>
        </Link>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#24292e",
  },
  tabs: {
    flexDirection: "row",
  },
  tab: {
    padding: 15,
  },
  text: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default AppBar;