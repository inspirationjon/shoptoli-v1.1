import { useContext } from 'react'
import { Context } from '../context/Authentication'

const useAuth = (setterOnly) => {
    const ctx = useContext(Context)

    return setterOnly ? [ctx.setState] : [ctx.state, ctx.setState]
}

export default useAuth
