import { Provider as PaperProvider } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import Login from './app/pages/login';


export default function App() {
  return (
    <PaperProvider>
      <View style={styles.container}>
        <Login />
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
