import { createDrawerNavigator } from '@react-navigation/drawer';
import { useAuth } from '../../../context/AuthContext';
import DrawerContent from './drawerContent';

import Home from '../home';
import Inventory from '../stock/inventory';

const Drawer = createDrawerNavigator();

export default function AppStack() {
    
    const { logout } = useAuth();

    return (
        <Drawer.Navigator
            drawerContent={(props) => <DrawerContent {...props} logout={logout} />}    
            screenOptions={{ headerShown: true}}
        >
            <Drawer.Screen name="Home" component={Home}/>
            <Drawer.Screen name="Inventory" component={Inventory}/>
        </Drawer.Navigator>
        
    )
}