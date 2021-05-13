import React, { useRef } from 'react'
import './ProfileButton.scss'
import { UserIcon } from '../Lib/Svg'
import useAuth from '../../hooks/useAuth'

function ProfileButton() {
    const profilWrap = useRef()

    const handleClick = () => {
        profilWrap.current.classList.toggle('display-block')
    }

    const [auth, setAuth] = useAuth()
    function handleLogOut() {
        setAuth(false)
    }

    return (
        <div className='profile'>
            <div className='profile__info'>
                <span className='profile__name'>{auth?.username}</span>
            </div>
            <button className='profile__btn' onClick={handleClick}>
                <UserIcon />
            </button>
            <div className='profile__wrapper' ref={profilWrap}>
                <button className='logout-btn' onClick={handleLogOut}>
                    Chiqish
                    <svg
                        width='20'
                        height='35'
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 490.667 490.667'>
                        <path
                            fill='#333333'
                            d='M437.333,0H202.667c-29.397,0-53.333,23.936-53.333,53.333v128c0,5.888,4.779,10.667,10.667,10.667 s10.667-4.779,10.667-10.667v-128c0-17.643,14.357-32,32-32h234.667c17.643,0,32,14.357,32,32v384c0,17.643-14.357,32-32,32 H202.667c-17.643,0-32-14.357-32-32v-128c0-5.888-4.779-10.667-10.667-10.667s-10.667,4.779-10.667,10.667v128 c0,29.397,23.936,53.333,53.333,53.333h234.667c29.397,0,53.333-23.936,53.333-53.333v-384C490.667,23.936,466.731,0,437.333,0z'></path>
                        <path
                            fill='#333333'
                            d='M352,234.667H10.667C4.779,234.667,0,239.445,0,245.333S4.779,256,10.667,256H352c5.888,0,10.667-4.779,10.667-10.667 S357.888,234.667,352,234.667z'></path>
                        <path
                            fill='#333333'
                            d='M359.531,237.824l-64-64c-4.16-4.16-10.923-4.16-15.083,0s-4.16,10.923,0,15.083l56.448,56.448l-56.448,56.448 c-4.16,4.16-4.16,10.923,0,15.083c2.091,2.069,4.821,3.115,7.552,3.115s5.461-1.045,7.531-3.093l64-64 C363.691,248.747,363.691,241.984,359.531,237.824z'></path>
                    </svg>
                </button>
            </div>
        </div>
    )
}

export default ProfileButton
