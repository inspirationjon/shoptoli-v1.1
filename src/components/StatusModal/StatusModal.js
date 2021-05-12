import React from 'react'
import './StatusModal.scss'

function StatusModal() {
    return (
        <form className='status-modal' method='POST'>
            <div className='status-modal__header'>
                <h3 className='status-modal__heading'>O'zgartirish</h3>
                <button className='status-modal__delete'>&#10006;</button>
            </div>

            <label className='status-modal__wrapper'>
                <input
                    className='status-modal__input visually-hidden'
                    type='radio'
                    id='user_status_pending'
                    name='user_status'
                />
                <label
                    className='status-modal__label'
                    htmlFor='user_status_pending'>
                    Pending
                </label>
            </label>

            <label className='status-modal__wrapper'>
                <input
                    className='status-modal__input visually-hidden'
                    type='radio'
                    id='user_status_card'
                    name='user_status'
                />
                <label
                    className='status-modal__label'
                    htmlFor='user_status_card'>
                    Card
                </label>
            </label>

            <label className='status-modal__wrapper'>
                <input
                    className='status-modal__input visually-hidden'
                    type='radio'
                    id='user_status_sent'
                    name='user_status'
                />
                <label
                    className='status-modal__label'
                    htmlFor='user_status_sent'>
                    Sent
                </label>
            </label>

            <button className='status-modal__submit-btn'>Saqlash</button>
        </form>
    )
}

export default StatusModal
