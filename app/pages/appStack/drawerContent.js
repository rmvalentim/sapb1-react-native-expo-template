import { DrawerContentScrollView } from '@react-navigation/drawer';
import { Drawer, Text } from 'react-native-paper';

export default function DrawerContent({ navigation, logout }) {
    return (
        <DrawerContentScrollView>
            <Drawer.Section title="Navegação">
                <Drawer.Item label="Home" icon="file-document-outline" onPress={() => navigation.navigate('Home')} />
                <Drawer.Item label="Inventory" icon="file-document-outline" onPress={() => navigation.navigate('Inventory')} />
            </Drawer.Section>
            <Drawer.Section title="Conta">
                <Drawer.Item label="Sair" icon="logout" onPress={logout} />
            </Drawer.Section>
        </DrawerContentScrollView>
    );
}