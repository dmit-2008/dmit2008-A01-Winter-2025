import {BASE_URL} from './base.js'

const login = ({email, password}) => {
    return fetch(`${BASE_URL}/login/`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'       
        },
        body: JSON.stringify({
            email,
            password
        })
    }).then((response)=> {
        if (response.ok) {
            return response.json();
        }
        return Promise.reject(response);
    }).then((data)=> {
        return data
    })
}

export { login }
