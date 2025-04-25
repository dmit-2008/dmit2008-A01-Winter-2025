import {BASE_URL} from './base.js'

const login = async ({email, password}) => {
  const response = await fetch(`${BASE_URL}/login/`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email,
      password
    })
  })
  if (!response.ok) {
    throw new Error("not valid creds")
  }
  const data = response.json()
  return data
}

export { login }
