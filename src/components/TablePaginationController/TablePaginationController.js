import React from 'react'
import { IconNext } from '../Lib/Svg'
import './TablePaginationController.scss'

function TablePaginationController({ className, setPage, noPrev, noNext }) {
    function handlePrevClick(evt) {
        evt.preventDefault()
        setPage((prev) => prev - 1)
    }

    function handleNextClick(evt) {
        evt.preventDefault()

        setPage((prev) => prev + 1)
    }
    return (
        <div className={`tables-controllers__wrapper ${className}`}>
            <button
                className='table-controller__btn table-controller__btn--prev'
                type='button'
                onClick={handlePrevClick}
                disabled={noPrev}>
                <IconNext />
            </button>

            <button
                className='table-controller__btn table-controller__btn--next'
                type='button'
                onClick={handleNextClick}
                disabled={noNext}>
                <IconNext />
            </button>
        </div>
    )
}

export default TablePaginationController
