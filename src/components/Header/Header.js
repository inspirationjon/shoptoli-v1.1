import React from 'react'
import './Header.scss'
import { Link } from 'react-router-dom'
import { MiniLogo } from '../Lib/Svg'
import ProfileButton from '../ProfileButton/ProfileButton'

function Header () {
   return (
      <header className="site-header header">
         <Link className='mini-logo' to='/'>
            <MiniLogo />
         </Link>
         <form className="search-form">
            <input className="search-input" placeholder="Mijozni qidiring..." type="text" />
         </form>
         <div className="header__right">
            <ProfileButton />
         </div>
      </header>
   )
}

export default Header
