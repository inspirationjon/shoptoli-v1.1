import { queryCache } from 'react-query'
const apiURL = process.env.REACT_APP_API_URL

async function client(
    endpoint,
    { data, token, headers: customHeaders, ...customConfig } = {}
) {
    const config = {
        method: data ? 'POST' : 'GET',
        body: data ? JSON.stringify(data) : undefined,
        headers: {
            token: token ? token : undefined,
            'Content-Type': data ? 'application/json' : undefined,
            ...customHeaders,
        },
        ...customConfig,
    }



    
    return window
        .fetch(`${apiURL}/${endpoint}`, config)
        .then(async (response) => {
            if (response.code === 401) {
                window.localStorage.clear('__auth_provider_token__', false)
                queryCache.clear()
                window.location.assign(window.location)
                return Promise.reject({ message: 'Please re-authenticate.' })
            }
            const data = await response.json()
            if (response.ok) {
                return data
            } else {
                return Promise.reject(data)
            }
        })
}

export { client }
