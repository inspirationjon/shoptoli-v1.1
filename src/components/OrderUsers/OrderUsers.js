import React from 'react'
import './OrderUsers.scss'
import { UsersIcon } from '../Lib/Svg'

function OrderUsers () {
   return (
      <div className="order-food">
         <div className="order-food-info">
            <UsersIcon />
            <div>
               <p className="order-food-text">Foydalanuvchilalar soni</p>
            </div>
         </div>

         <div>
            <span className="order-food-num">120/70</span>
         </div>
      </div>
   )
}

export default OrderUsers
