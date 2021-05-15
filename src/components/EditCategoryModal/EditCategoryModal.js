import React from 'react'
import './EditCategoryModal.scss'
import useAuth from '../../hooks/useAuth'

function EditCategoryModal({ modal, setModal }) {
    const [auth] = useAuth()

    function handleSaveOrder(evt) {
        evt.preventDefault()
        const { catagory_info_name } = evt.target.elements

        fetch(process.env.REACT_APP_API_URL + '/admin/catagoriesinfo', {
            method: 'PUT',
            headers: {
                token: auth.token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                catagory_info_name: catagory_info_name.value.trim(),
                language_id: modal.language_id,
                catagory_info_id: modal.catagory_info_id,
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
            className='category-modal__wrapper'
            style={{ display: modal.open ? 'flex' : 'none' }}>
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

                <div className='category-modal__input-box'>
                    <label
                        className='category-modal__label'
                        htmlFor='catagory_info_name'>
                        Kategoriya nomi
                    </label>
                    <input
                        type='text'
                        className='category-modal__input'
                        id='catagory_info_name'
                        name='catagory_info_name'
                        placeholder='Kategoriya nomi'
                        required
                    />
                </div>

                <button className='category-modal__submit-btn' type='submit'>
                    Saqlash
                </button>
            </form>
        </div>
    )
}

export default EditCategoryModal
