import { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Appbar, TextInput, Button, HelperText } from 'react-native-paper'
import { authenticate as authenticateService } from '../../services/loginService';
import { useAuth } from '../../../context/AuthContext';

export default function User(props) {

    const { login } = useAuth();

    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [hasError, setHasError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    async function authenticate() {
        try {
            const authenticationData = await authenticateService(user, password)
            login(authenticationData.SessionId)            
        } catch (error) {
            setErrorMessage(error.message);
            setHasError(true);
        }
    }

    return (
        <View>
            <Appbar.Header>
                <Appbar.Content title="User" />
            </Appbar.Header>
            <View style={styles.userContainer}>
                <TextInput
                    mode="outlined"
                    autoCapitalize="none"
                    label="User"
                    style={styles.textInput}
                    value={user}
                    onChangeText={(text) => {
                        setUser(text)
                    }}
                />
                <TextInput
                    mode="outlined"
                    autoCapitalize="none"
                    label="Senha"
                    style={styles.textInput}
                    secureTextEntry={true}
                    value={password}
                    onChangeText={(text) => {
                        setPassword(text)
                    }}
                />
                <Button
                    mode="contained"
                    style={styles.button}
                    onPress={authenticate}>
                    User
                </Button>
                <HelperText type="error" visible={hasError}>
                    {errorMessage}
                </HelperText>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    textInput: {
        margin: 10
    },
    button: {
        width: '50%',
        alignSelf: 'center',
        margin: 10
    }
})