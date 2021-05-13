import React from 'react'
import './StatusModal.scss'
import useAuth from '../../hooks/useAuth'

function StatusModal({ modal, setModal }) {
    const [auth] = useAuth()

    const [status, setStatus] = React.useState(null)

    function handleChangeInput(evt) {
        setStatus(evt.target.value)
    }

    function handleSaveOrder(evt) {
        evt.preventDefault()

        fetch('https://83-229-86-24.cloud-xip.io/admin/orders', {
            method: 'PUT',
            headers: {
                token: auth.token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                order_id: modal.order_id,
                order_status: status,
            }),
        })
            .then((msg) => msg.json())
            .then((msg) => {
                if (msg.status === 200) {
                    alert('Completed')
                } else {
                    alert('Uh oh, error!')
                }
            })

        setModal({ open: false })
    }

    function handleCloseModal() {
        setModal({ open: false })
    }

    return (
        <div
            className='status-modal__wrapper'
            style={{ display: modal.open ? 'flex' : 'none' }}>
            <form
                className='status-modal'
                method='POST'
                onSubmit={handleSaveOrder}>
                <div className='status-modal__header'>
                    <h3 className='status-modal__heading'>O'zgartirish</h3>
                    <button
                        className='status-modal__delete'
                        type='button'
                        onClick={handleCloseModal}>
                        &#10006;
                    </button>
                </div>

                <label className='status-modal__input-wrapper'>
                    <input
                        className='status-modal__input visually-hidden'
                        type='radio'
                        value='0'
                        id='user_status_cart'
                        name='user_status'
                        onChange={handleChangeInput}
                    />
                    <label
                        className='status-modal__label'
                        htmlFor='user_status_cart'>
                        Cart
                    </label>
                </label>

                <label className='status-modal__input-wrapper'>
                    <input
                        className='status-modal__input visually-hidden'
                        type='radio'
                        value='1'
                        id='user_status_ordered'
                        name='user_status'
                        onChange={handleChangeInput}
                    />
                    <label
                        className='status-modal__label'
                        htmlFor='user_status_ordered'>
                        Ordered
                    </label>
                </label>

                <label className='status-modal__input-wrapper'>
                    <input
                        className='status-modal__input visually-hidden'
                        type='radio'
                        value='2'
                        id='user_status_verified'
                        name='user_status'
                        onChange={handleChangeInput}
                    />
                    <label
                        className='status-modal__label'
                        htmlFor='user_status_verified'>
                        Verified
                    </label>
                </label>

                <label className='status-modal__input-wrapper'>
                    <input
                        className='status-modal__input visually-hidden'
                        type='radio'
                        value='3'
                        id='user_status_delivery'
                        name='user_status'
                        onChange={handleChangeInput}
                    />
                    <label
                        className='status-modal__label'
                        htmlFor='user_status_delivery'>
                        Delivery
                    </label>
                </label>

                <label className='status-modal__input-wrapper'>
                    <input
                        className='status-modal__input visually-hidden'
                        type='radio'
                        value='4'
                        id='user_status_completed'
                        name='user_status'
                        onChange={handleChangeInput}
                    />
                    <label
                        className='status-modal__label'
                        htmlFor='user_status_completed'>
                        Completed
                    </label>
                </label>

                <label className='status-modal__input-wrapper'>
                    <input
                        className='status-modal__input visually-hidden'
                        type='radio'
                        value='5'
                        id='user_status_cancelled'
                        name='user_status'
                        onChange={handleChangeInput}
                    />
                    <label
                        className='status-modal__label'
                        htmlFor='user_status_cancelled'>
                        Cancelled
                    </label>
                </label>

                <label className='status-modal__input-wrapper'>
                    <input
                        className='status-modal__input visually-hidden'
                        type='radio'
                        value='6'
                        id='user_status_cleaned'
                        name='user_status'
                        onChange={handleChangeInput}
                    />
                    <label
                        className='status-modal__label'
                        htmlFor='user_status_cleaned'>
                        Cleaned
                    </label>
                </label>

                <button className='status-modal__submit-btn' type='submit'>
                    Saqlash
                </button>
            </form>
        </div>
    )
}

export default StatusModal
