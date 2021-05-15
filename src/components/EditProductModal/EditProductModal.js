import React from 'react'
import './EditProductModal.scss'
import useAuth from '../../hooks/useAuth'

function EditProductModal({ modal, setModal }) {
    const [auth] = useAuth()

    function handleSaveOrder(evt) {
        evt.preventDefault()
        const { product_status } = evt.target.elements
        fetch(process.env.REACT_APP_API_URL + '/admin/products', {
            method: 'PUT',
            headers: {
                token: auth.token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                product_status: product_status.value.trim(),
                product_id: modal.product_id,
            }),
        })
            .then((msg) => msg.json())
            .then((msg) => {
                if (msg.status === 200) {
                    alert('Bajarildi')
                } else {
                    alert('Uh oh, xatolik! 🥴')
                }
            })

        setModal({ open: false })
    }

    function handleCloseModal() {
        setModal({ open: false })
    }

    return (
        <div
            className='category-modal__wrapper'
            style={{ display: modal?.open ? 'flex' : 'none' }}>
            <form
                className='category-modal'
                method='POST'
                onSubmit={handleSaveOrder}>
                <div className='category-modal__header'>
                    <h3 className='category-modal__heading'>Tahrirlash</h3>
                    <button
                        className='category-modal__delete'
                        type='button'
                        onClick={handleCloseModal}>
                        &#10006;
                    </button>
                </div>

                <img
                className='category-modal__img'
                    src={modal?.product_image}
                    alt='Product'
                    width='200'
                    height='200'
                />

                <div className='category-modal__input-box'>
                    <label
                        className='category-modal__label'
                        htmlFor='product_status'>
                        Mahsulot holati
                    </label>

                    <select
                        className='products__create-input'
                        name='product_status'
                        id='product_status'
                        defaultValue={modal?.product_status}
                        required>
                        <option value='0'>off</option>
                        <option value='1'>on</option>
                    </select>
                </div>

                <button className='category-modal__submit-btn' type='submit'>
                    Saqlash
                </button>
            </form>
        </div>
    )
}

export default EditProductModal
