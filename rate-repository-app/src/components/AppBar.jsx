import { View, StyleSheet, Pressable } from 'react-native';
import Constants from 'expo-constants';
import { Link } from 'react-router-native';
import Text from './Text';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#24292e',
    flexDirection: 'row',
    padding: 15,
  },
  tab: {
    marginRight: 20,
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <Link to="/" component={Pressable} style={styles.tab}>
        <Text style={styles.text}>Repositories</Text>
      </Link>

      <Link to="/signin" component={Pressable} style={styles.tab}>
        <Text style={styles.text}>Sign in</Text>
      </Link>
    </View>
  );
};

export default AppBar;