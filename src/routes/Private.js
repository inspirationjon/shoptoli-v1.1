import { Route, Redirect } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

function Private({ children, ...props }) {
    const [auth] = useAuth(false)

    if (!auth) {
        return <Redirect to='/login' />
    }

    return <Route {...props} />
}

export default Private
