
import { Config } from '../config';

export async function authenticate(user, password) {

    const url = `${Config.SERVICE_LAYER_URL}/Login`;

    const config = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            CompanyDB: Config.COMPANY_DB,
            UserName: user,
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
        throw new Error(error.message );
    }
}