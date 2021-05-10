import React from 'react'
import './OrderFood.scss'
import { IconOrder } from '../Lib/Svg'

function OrderFood () {
   return (
      <div className="order-food">
         <div className="order-food-info">
            <IconOrder />
            <div>
               <p className="order-food-text">Buyurtmalar soni</p>
            </div>
         </div>

         <div>
            <span className="order-food-num">120</span>
         </div>
      </div>
   )
}

export default OrderFood
