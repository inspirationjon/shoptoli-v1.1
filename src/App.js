import React from 'react'
import './App.scss'
import { Switch, useLocation } from 'react-router-dom'
import Private from './routes/Private'
import Public from './routes/Public'
import SideBar from './components/SideBar/SideBar'
import Header from './components/Header/Header'
import Orders from './screens/Orders/Orders'
import SingleOrder from './screens/SingleOrder/SingleOrder'
import Clients from './screens/Clients/Clients'
import Products from './screens/Products/Products'
import Statistics from './screens/Statistics/Statistics'
import Settings from './screens/Settings/Settings'
import Login from './screens/Login/Login'

function App() {
    let { pathname } = useLocation()
    return (
        <>
            {pathname !== '/login' && (
                <div className='main-wrapper'>
                    <SideBar />
                    <div className='content-wrapper'>
                        <Header />
                        <Switch>
                            <Private exact path='/' component={Orders} />
                            <Private
                                path='/order/:id'
                                component={SingleOrder}
                            />
                            <Private
                                path='/clients'
                                component={Clients}
                                exact
                            />
                            <Private
                                path='/products'
                                component={Products}
                                exact
                            />
                            <Private
                                path='/statistics'
                                component={Statistics}
                                exact
                            />
                            <Private
                                path='/settings'
                                component={Settings}
                                exact
                            />
                        </Switch>
                    </div>
                </div>
            )}
            <Switch>
                <Public exact path='/login' component={Login} />
            </Switch>
        </>
    )
}

export default App
