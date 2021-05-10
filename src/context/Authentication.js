import { createContext, useEffect, useState } from 'react'

const Context = createContext(null)

function Provider({ children }) {
    const [state, setState] = useState(
        JSON.parse(window.localStorage.getItem('__auth_provider_token__'))
    )

    useEffect(() => {
        if (state) {
            window.localStorage.setItem('__auth_provider_token__', JSON.stringify(state))
        } else {
            window.localStorage.removeItem('__auth_provider_token__')
        }
    }, [state])

    return (
        <Context.Provider value={{ state, setState }}>
            {children}
        </Context.Provider>
    )
}

export { Context, Provider }
