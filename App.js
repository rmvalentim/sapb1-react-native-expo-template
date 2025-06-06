import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as PaperProvider } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import { AuthProvider, useAuth } from './context/AuthContext'
import Login from './app/pages/login';
import AppStack from './app/pages/appStack';

const Stack = createNativeStackNavigator();

export function RootNavigation() {

  const { isAuthenticated } = useAuth();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isAuthenticated ? (
          <Stack.Screen name="Login" component={Login} />
        ) : (
          <Stack.Screen name="AppStack" component={AppStack} />
        )
        }
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <PaperProvider>
      <View style={styles.container}>
        <AuthProvider>
          <RootNavigation />
        </AuthProvider>
      </View>
    </PaperProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
