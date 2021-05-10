import React from 'react'
import { Link } from 'react-router-dom'
import { Logo } from '../Lib/Svg'
import './SideBar.scss'
import NavBar from '../NavBar/NavBar'

function SideBar() {
    return (
        <div className='sidebar-wrapper'>
            <Link className='logo-link' to='/'>
                <Logo />
            </Link>

            <NavBar />
        </div>
    )
}

export default SideBar
