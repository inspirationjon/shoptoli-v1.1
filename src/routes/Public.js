import { useLocation, Redirect, Route } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

function Public({ children, ...props }) {
    const { pathname } = useLocation()

    const [auth] = useAuth(false)

    if (auth && pathname === '/login') {
        return <Redirect to='/' />
    }

    return <Route {...props} />
}

export default Public
