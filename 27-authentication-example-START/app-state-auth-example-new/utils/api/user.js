import {BASE_URL} from './base.js'

const updateUser = ({data, token, id}) => {
    return fetch(`${BASE_URL}/users/${id}`, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
    }).then((response)=> {
        return response.json()
    }).then((data)=> {
        return data
    })
}

export { updateUser }
