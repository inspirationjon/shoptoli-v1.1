import React from 'react'
import { NavLink } from 'react-router-dom'
import './NavBar.scss'
import {
    IconStat,
    IconOrder,
    IconClient,
    IconSettings,
    IconProducts,
} from '../Lib/Svg'

function Navbar() {
    return (
        <nav className='site-nav'>
            <ul className='nav-list'>
                <li className='nav-list-item'>
                    <NavLink
                        className='nav-link'
                        activeClassName='nav-link--active'
                        to='/'
                        exact>
                        <IconOrder className='nav-link-icon' />
                        <span className='nav-link-text'>Orders</span>
                    </NavLink>
                </li>
                <li className='nav-list-item'>
                    <NavLink
                        className='nav-link'
                        activeClassName='nav-link--active'
                        to='/clients'>
                        <IconClient className='nav-link-icon' />
                        <span className='nav-link-text'>Clients</span>
                    </NavLink>
                </li>
                <li className='nav-list-item'>
                    <NavLink
                        className='nav-link'
                        activeClassName='nav-link--active'
                        to='/products'>
                        <IconProducts className='nav-link-icon' />
                        <span className='nav-link-text'>Products</span>
                    </NavLink>
                </li>
                <li className='nav-list-item'>
                    <NavLink
                        className='nav-link'
                        activeClassName='nav-link--active'
                        to='/statistics'>
                        <IconStat className='nav-link-icon' />
                        <span className='nav-link-text'>Statistics</span>
                    </NavLink>
                </li>
                <li className='nav-list-item'>
                    <NavLink
                        className='nav-link'
                        activeClassName='nav-link--active'
                        to='/settings'>
                        <IconSettings className='nav-link-icon' />
                        <span className='nav-link-text'>Settings</span>
                    </NavLink>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar
