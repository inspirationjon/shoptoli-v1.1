import React from 'react'
import './ProductsBox.scss'
import { client } from '../../utils/api-client'
import useAuth from '../../hooks/useAuth'
import { useQuery } from 'react-query'
import EditProductModal from '../EditProductModal/EditProductModal'

function ProductsBox() {
    const [auth] = useAuth()

    const { data, isSuccess } = useQuery({
        queryKey: 'products',
        queryFn: () => client('admin/products', { token: auth.token }),
    })

    const { data: categories, isSuccess: isSuccessCategories } = useQuery({
        queryKey: 'categories',
        queryFn: () => client('admin/catagories', { token: auth.token }),
    })

    let readyCategories =
        isSuccessCategories &&
        categories?.data?.filter((item) => {
            return item.language_id === 1
        })

    function handleSubmitCreateCategory(evt) {
        evt.preventDefault()

        const {
            product_info_name_uz,
            product_info_name_ru,
            product_info_desc_uz,
            product_info_desc_ru,
            product_price,
            product_image,
            product_status,
            product_category_id,
        } = evt.target.elements

        client('admin/products', {
            data: {
                product_price: product_price.value.trim(),
                product_image: product_image.value.trim(),
                product_status: product_status.value.trim(),
                catagory_id: product_category_id.value.trim(),
            },
            token: auth.token,
        }).then((data) => {
            let productId = data?.data[0]?.product_id

            productId &&
                client('admin/productsinfo', {
                    data: {
                        product_info_name: product_info_name_uz.value.trim(),
                        product_info_desc: product_info_desc_uz.value.trim(),
                        language_id: 1,
                        product_id: productId,
                    },
                    token: auth.token,
                })

            productId &&
                client('admin/productsinfo', {
                    data: {
                        product_info_name: product_info_name_ru.value.trim(),
                        product_info_desc: product_info_desc_ru.value.trim(),
                        language_id: 2,
                        product_id: productId,
                    },
                    token: auth.token,
                }).then((data) =>
                    alert(data.message ? 'Yaratildi 😄' : 'Uh oh, xatolik! 🥴')
                )
        })
    }

    const [modal, setModal] = React.useState({})

    function handleClickModalEdit(evt) {
        setModal({
            open: true,
            product_id: evt.target.dataset.productid,
            language_id: evt.target.dataset.languageid,
            product_status: evt.target.dataset.productstatus,
            product_image: evt.target.dataset.productimage,
        })
    }

    function handleDeleteCategory(evt) {
        fetch('https://83-229-86-24.cloud-xip.io/admin/products', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                token: auth.token,
            },
            body: JSON.stringify({
                product_id: evt.target.dataset.delid,
            }),
        }).then(() => alert("O'chdi 😨"))
    }
    return (
        <div className='products__wrapper'>
            <form
                className='products__create-form'
                autoComplete='off'
                method='POST'
                onSubmit={handleSubmitCreateCategory}>
                <div className='products__create-form-left'>
                    <div className='products__create-form-inner'>
                        <p className='products__create-form-label'>
                            Nom <strong>uz/ru</strong>
                        </p>
                        <input
                            className='products__create-input'
                            name='product_info_name_uz'
                            type='text'
                            placeholder='Mahsulot nomi ...'
                            required
                        />
                        <input
                            className='products__create-input'
                            name='product_info_name_ru'
                            type='text'
                            placeholder='Имя продукта ...'
                            required
                        />
                    </div>

                    <div className='products__create-form-inner'>
                        <p className='products__create-form-label'>
                            Ta'rif <strong>uz/ru</strong>
                        </p>
                        <input
                            className='products__create-input'
                            name='product_info_desc_uz'
                            type='text'
                            placeholder="Mahsulot ta'rifi ..."
                            required
                        />
                        <input
                            className='products__create-input'
                            name='product_info_desc_ru'
                            type='text'
                            placeholder='Информация о продукте ...'
                            required
                        />
                    </div>
                </div>

                <div className='products__create-form-right'>
                    <div className='products__create-form-inner'>
                        <label
                            className='products__create-form-label'
                            htmlFor='product_price'>
                            Narx
                        </label>
                        <input
                            className='products__create-input'
                            id='product_price'
                            name='product_price'
                            type='number'
                            placeholder='Mahsulot narxi ...'
                            required
                        />
                    </div>

                    <div className='products__create-form-inner'>
                        <label
                            className='products__create-form-label'
                            htmlFor='product_category_id'>
                            Kategoriya
                        </label>
                        <select
                            className='products__create-input'
                            name='product_category_id'
                            id='product_category_id'
                            required>
                            <option value=''>Tanlang</option>
                            {isSuccessCategories &&
                                readyCategories?.map((item) => (
                                    <option
                                        value={item?.catagory_id}
                                        key={Math.random()}>
                                        {item?.catagory_info_name}
                                    </option>
                                ))}
                        </select>
                    </div>

                    <div className='products__create-form-inner'>
                        <label
                            className='products__create-form-label'
                            htmlFor='product_image'>
                            Rasm linki
                        </label>
                        <input
                            className='products__create-input'
                            name='product_image'
                            type='text'
                            id='product_image'
                            placeholder='Mahsulot rasmi linki...'
                            required
                        />
                    </div>

                    <div className='products__create-form-inner'>
                        <label
                            className='products__create-form-label'
                            htmlFor='product_status'>
                            Holat
                        </label>
                        <select
                            className='products__create-input'
                            name='product_status'
                            id='product_status'
                            defaultValue='0'
                            required>
                            <option value='0'>off</option>
                            <option value='1'>on</option>
                        </select>
                    </div>

                    <button className='products__create-btn'>Yaratish</button>
                </div>
            </form>
            <div className='products__table-wrapper'>
                <table className='products__table'>
                    <thead className='products__thead'>
                        <tr className='products__thead-tr'>
                            <th className='products__thead-th'>Name</th>
                            <th className='products__thead-th'>Ma'lumot</th>
                            <th className='products__thead-th'>Tahrirlash</th>
                            <th className='products__thead-th'>O'chirish</th>
                        </tr>
                    </thead>
                    <tbody className='products__tbody'>
                        {isSuccess &&
                            data?.data?.map((item) => (
                                <tr
                                    className='products__tbody-tr'
                                    key={Math.random()}>
                                    <td className='products__tbody-td'>
                                        {item?.product_info_name}
                                    </td>
                                    <td className='products__tbody-td'>
                                        {item?.product_info_desc}
                                    </td>
                                    <td className='products__tbody-td products__tbody-td-link-main'>
                                        <button
                                            className='products__tbody-td-btn'
                                            onClick={handleClickModalEdit}
                                            data-languageid={item?.language_id}
                                            data-productid={item?.product_id}
                                            data-productimage={
                                                item?.product_image
                                            }
                                            data-productstatus={
                                                item?.product_status
                                            }>
                                            holat
                                        </button>
                                    </td>
                                    <td className='products__tbody-td products__tbody-td-del'>
                                        <button
                                            className='products__delete-btn'
                                            data-delid={item?.product_id}
                                            onDoubleClick={
                                                handleDeleteCategory
                                            }>
                                            o'chirish
                                        </button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>

            <EditProductModal modal={modal} setModal={setModal} />
        </div>
    )
}

export default ProductsBox
