import React from 'react'
import { useParams } from 'react-router'
import './SingleCategory.scss'

function SingleCategory() {
    const { categoryid, languageid } = useParams()

    return (
        <div className='single-category__wrapper'>
            <h2 className='single-category__heading'>
                Kategoriya ma'lumotlarini o'zgaritish
            </h2>
            <form className='single-category__form' method='POST'>
                <input
                    className='single-category__create-input'
                    name='catagory_info_name'
                    type='text'
                    placeholder='Имя категории на русском...'
                    required
                />
            </form>
        </div>
    )
}

export default SingleCategory
