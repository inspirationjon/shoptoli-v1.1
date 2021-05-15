import React from 'react'
import './ProductsBox.scss'
import { client } from '../../utils/api-client'
import useAuth from '../../hooks/useAuth'
import { useQuery } from 'react-query'
import EditCategoryModal from '../EditCategoryModal/EditCategoryModal'

function ProductsBox() {
    const [auth] = useAuth()
    const { data, isSuccess } = useQuery({
        queryKey: 'products',
        queryFn: () => client('admin/products', { token: auth.token }),
    })

    function handleSubmitCreateCategory(evt) {
        evt.preventDefault()

        const { product_info_name_uz, product_info_name_ru } =
            evt.target.elements
    }

    const [modal, setModal] = React.useState({})

    function handleClickModalEdit(evt) {
        setModal({
            open: true,
            language_id: evt.target.dataset.languageid,
            catagory_info_id: evt.target.dataset.infoid,
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
                catagory_id: evt.target.dataset.delid,
            }),
        }).then((data) => alert(data.message ? data.message : 'Uh oh, xato!'))
    }
    return (
        <div className='categories__wrapper'>
            <form
                autoComplete='off'
                className='category__create-form'
                method='POST'
                onSubmit={handleSubmitCreateCategory}>
                <div className=''>
                    <p className=''>
                        Nom <strong>uz/ru</strong>
                    </p>
                    <input
                        className='category__create-input'
                        name='product_info_name_uz'
                        type='text'
                        placeholder='Mahsulot nomi ...'
                        required
                    />
                    <input
                        className='category__create-input'
                        name='product_info_name_ru'
                        type='text'
                        placeholder='Имя продукта ...'
                        required
                    />
                </div>

                <div className=''>
                    <p className=''>
                        Ta'rif <strong>uz/ru</strong>
                    </p>
                    <input
                        className='category__create-input'
                        name='product_info_desc_uz'
                        type='text'
                        placeholder="Mahsulot ta'rifi ..."
                        required
                    />
                    <input
                        className='category__create-input'
                        name='product_info_desc_ru'
                        type='text'
                        placeholder='Информация о продукте ...'
                        required
                    />
                </div>

                <div className=''>
                    <label className=''>Narx</label>
                    <input
                        className='category__create-input'
                        name='product_price'
                        type='number'
                        placeholder='Mahsulot narxi ...'
                        required
                    />
                </div>

                <div className=''>
                    <label className='' htmlFor='product_image'>
                        Rasm
                    </label>
                    <input
                        className='category__create-input'
                        name='product_image'
                        type='file'
                        id='product_image'
                        placeholder='Mahsulot rasmi ...'
                        required
                    />

                    <label className='product_status'>Holat</label>
                    <select name='product_status' id='product_status' defaultValue='0'>
                        <option value='0'>off</option>
                        <option value='1'>on</option>
                    </select>
                </div>
                <button className='category__create-btn'>Yaratish</button>
            </form>
            <table className='categories__table'>
                <thead className='categories__thead'>
                    <tr className='categories__thead-tr'>
                        <th className='categories__thead-th'>Name</th>
                        <th className='categories__thead-th'>Ma'lumot</th>
                        <th className='categories__thead-th'>Tahrirlash</th>
                        <th className='categories__thead-th'>O'chirish</th>
                    </tr>
                </thead>
                <tbody className='categories__tbody'>
                    {isSuccess &&
                        data?.data?.map((item) => (
                            <tr
                                className='categories__tbody-tr'
                                key={Math.random()}>
                                <td className='categories__tbody-td'>
                                    {item?.product_info_name}
                                </td>
                                <td className='categories__tbody-td'>
                                    {item?.product_info_desc}
                                </td>
                                <td className='categories__tbody-td categories__tbody-td-link-main'>
                                    <button
                                        className='categories__tbody-td-btn'
                                        onClick={handleClickModalEdit}
                                        data-languageid={item?.language_id}
                                        data-infoid={item?.product_info_id}>
                                        tahrirlash
                                    </button>
                                </td>
                                <td className='categories__tbody-td categories__tbody-td-del'>
                                    <button
                                        className='categories__delete-btn'
                                        data-delid={item?.product_id}
                                        onDoubleClick={handleDeleteCategory}>
                                        o'chirish
                                    </button>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>

            <EditCategoryModal modal={modal} setModal={setModal} />
        </div>
    )
}

export default ProductsBox
