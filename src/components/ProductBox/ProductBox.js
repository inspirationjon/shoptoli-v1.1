import React from 'react'
import { Link } from 'react-router-dom'
import './ProductBox.scss'
function ProductBox() {
    return (
        <div className='product-box'>
            <img
                src='http://via.placeholder.com/200x200'
                alt='A simple pic'
                width='200'
                height='200'
            />

            <div className='product-box__inner'>
                <h3 className='product-box__heading'>Zig'ir osh</h3>

                <p className='product-box__price'>2000 so'm</p>

                <Link
                    className='product-box__more-link'
                    to='products/:product-id'>
                    Batafsil
                </Link>

                <div className='product-box__input-box'>
                    <label className='product-label' htmlFor='product_works'>
                        Ishlaydi
                    </label>
                    <label class='switch'>
                        <input type='checkbox' name='product_switch' />
                        <span className='slider round'></span>
                    </label>
                </div>
            </div>
        </div>
    )
}

export default ProductBox
