import AsyncStorage from '@react-native-async-storage/async-storage';

export async function authenticate(password) {

    const savedUser = await AsyncStorage.getItem('@config:defaultUser');
    const savedServiceLayerURL = await AsyncStorage.getItem('@config:serviceLayerURL');
    const savedCompanyDb = await AsyncStorage.getItem('@config:companyDb');

    const url = `${savedServiceLayerURL}/Login`;

    const config = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            CompanyDB: savedCompanyDb,
            UserName: savedUser,
            Password: password
        })
    }

    try {
        const response = await fetch(url, config);
        const data = await response.json();

        if (response.status !== 200) {
            throw new Error(data?.error?.message?.value || 'Erro desconhecido ao autenticar');
        }

        return (data)
    } catch (error) {
        throw new Error(error.message);
    }
}