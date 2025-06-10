import { useState, useEffect } from 'react'
import { StyleSheet, View, TouchableWithoutFeedback, KeyboardAvoidingView, ScrollView, Platform, Keyboard } from 'react-native'
import { Appbar, TextInput, Button, HelperText, IconButton } from 'react-native-paper'
import { authenticate as authenticateService } from '../../services/loginService';
import { useAuth } from '../../../context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login(props) {

    const { login } = useAuth();

    const [defaultUser, setDefaultUser] = useState('');
    const [password, setPassword] = useState('');
    const [hasError, setHasError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const [isSettingsVisible, setIsSettingsVisible] = useState(false)
    const [serviceLayerURL, setServiceLayerURL] = useState('');
    const [companyDb, setCompanyDb] = useState('');

    useEffect(() => {
        loadConfig();
    }, []);

    async function loadConfig() {
        try {
            const savedUser = await AsyncStorage.getItem('@config:defaultUser');
            const savedServiceLayerURL = await AsyncStorage.getItem('@config:serviceLayerURL');
            const savedCompanyDb = await AsyncStorage.getItem('@config:companyDb');

            if (savedUser && savedServiceLayerURL && savedCompanyDb) {
                setDefaultUser(savedUser);
                setServiceLayerURL(savedServiceLayerURL);
                setCompanyDb(savedCompanyDb);
            }

        } catch (error) {
            setErrorMessage("Load settings fail");
            setHasError(true);
        }

    }

    async function authenticate() {
        try {
            const authenticationData = await authenticateService(password)
            login(authenticationData.SessionId)
        } catch (error) {
            setErrorMessage(error.message);
            setHasError(true);
        }
    }

    async function saveSettings() {
        if (defaultUser && serviceLayerURL && companyDb) {
            try {
                await AsyncStorage.setItem('@config:defaultUser', defaultUser);
                await AsyncStorage.setItem('@config:serviceLayerURL', serviceLayerURL);
                await AsyncStorage.setItem('@config:companyDb', companyDb);
                setIsSettingsVisible(false);
            } catch (error) {
                setErrorMessage("Save settings fail");
                setHasError(true);
            }
        }
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
            >
                <ScrollView>
                    <Appbar.Header>
                        <Appbar.Content title="B1-Stock" />
                    </Appbar.Header>
                    <View style={styles.userContainer}>
                        <TextInput
                            mode="outlined"
                            autoCapitalize="none"
                            label="User"
                            style={styles.textInput}
                            value={defaultUser}
                            disabled={true}
                        />
                        <TextInput
                            mode="outlined"
                            autoCapitalize="none"
                            label="Password"
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
                        <IconButton
                            icon="cog"
                            size={30}
                            mode='contained'
                            style={styles.settingsButton}
                            onPress={() => setIsSettingsVisible(!isSettingsVisible)}
                        />
                        {isSettingsVisible && (
                            <View>
                                <TextInput
                                    mode="outlined"
                                    autoCapitalize="none"
                                    label="Default User"
                                    style={styles.textInput}
                                    value={defaultUser}
                                    onChangeText={(text) => {
                                        setDefaultUser(text)
                                    }}
                                />
                                <TextInput
                                    mode="outlined"
                                    autoCapitalize="none"
                                    label="Service Layer URL"
                                    style={styles.textInput}
                                    value={serviceLayerURL}
                                    onChangeText={(text) => {
                                        setServiceLayerURL(text)
                                    }}
                                />
                                <TextInput
                                    mode="outlined"
                                    autoCapitalize="none"
                                    label="Company DB"
                                    style={styles.textInput}
                                    value={companyDb}
                                    onChangeText={(text) => {
                                        setCompanyDb(text)
                                    }}
                                />
                                <Button
                                    mode="contained"
                                    style={styles.button}
                                    onPress={saveSettings}>
                                    Save Settings
                                </Button>
                            </View>
                        )}
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
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
    },
    settingsButton: {
        margin: 10
    }
})