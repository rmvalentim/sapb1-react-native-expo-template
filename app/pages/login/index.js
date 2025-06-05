import { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Appbar, TextInput, Button, HelperText } from 'react-native-paper'
import { authenticate as authenticateService } from '../../services/loginService';

export default function Login() {

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [hasError, setHasError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    async function authenticate() {
        try {
            const authenticationData = await authenticateService(login, password)
            //redirect to home
        } catch (error) {
            setErrorMessage(error.message);
            setHasError(true);
        }

    }

    return (
        <View>
            <Appbar.Header>
                <Appbar.Content title="Login" />
            </Appbar.Header>
            <View style={styles.loginContainer}>
                <TextInput
                    mode="outlined"
                    autoCapitalize="none"
                    label="Login"
                    style={styles.textInput}
                    value={login}
                    onChangeText={(text) => {
                        setLogin(text)
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
                    Login
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