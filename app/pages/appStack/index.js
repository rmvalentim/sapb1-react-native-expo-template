import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../home';
import Inventory from '../stock/inventory'

const Stack = createNativeStackNavigator();

export default function AppStack() {
    return (
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={Home}/>
            <Stack.Screen name="Inventory" component={Inventory}/>
        </Stack.Navigator>
    )
}