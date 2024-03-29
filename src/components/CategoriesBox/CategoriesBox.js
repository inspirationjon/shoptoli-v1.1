import React from 'react'
import './CategoriesBox.scss'
import { client } from '../../utils/api-client'
import useAuth from '../../hooks/useAuth'
import { useQuery } from 'react-query'
import EditCategoryModal from '../EditCategoryModal/EditCategoryModal'

function CategoriesBox() {
	const [auth] = useAuth()
	const { data, isSuccess } = useQuery({
		queryKey: 'categories',
		queryFn: () => client('admin/catagories', { token: auth.token }),
	})

	function handleSubmitCreateCategory(evt) {
		evt.preventDefault()

		const { catagory_info_name_uz, catagory_info_name_ru } =
			evt.target.elements

		client('admin/catagories', {
			data: {
				catagory_status: '1',
				catagory_keyword: 'notsale',
			},
			token: auth.token,
		}).then((data) => {
			let categoryId = data.data[0].catagory_id

			categoryId &&
				client('admin/catagoriesinfo', {
					data: {
						catagory_info_name: catagory_info_name_uz.value.trim(),
						language_id: 1,
						catagory_id: categoryId,
					},
					token: auth.token,
				})

			categoryId &&
				client('admin/catagoriesinfo', {
					data: {
						catagory_info_name: catagory_info_name_ru.value.trim(),
						language_id: 2,
						catagory_id: categoryId,
					},
					token: auth.token,
				}).then((data) => {
					alert(data.message ? 'Yaratildi 😄' : 'Uh oh, xatolik! 🥴')
				})
		})
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
		fetch(process.env.REACT_APP_API_URL + '/admin/catagories', {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				token: auth.token,
			},
			body: JSON.stringify({
				catagory_id: evt.target.dataset.delid,
			}),
		}).then(() => alert("O'chdi 😨"))
	}
	return (
		<div className='categories__wrapper'>
			<form
				autoComplete='off'
				className='category__create-form'
				method='POST'
				onSubmit={handleSubmitCreateCategory}>
				<input
					className='category__create-input'
					name='catagory_info_name_uz'
					type='text'
					placeholder="Kategoriya nomi o'zbekcha..."
					required
				/>
				<input
					className='category__create-input'
					name='catagory_info_name_ru'
					type='text'
					placeholder='Имя категории на русском...'
					required
				/>

				<button className='category__create-btn'>Yaratish</button>
			</form>

			<div className='categories__table-wrapper'>
				<table className='categories__table'>
					<thead className='categories__thead'>
						<tr className='categories__thead-tr'>
							<th className='categories__thead-th'>Name</th>
							<th className='categories__thead-th'>Sale</th>
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
										{item?.catagory_info_name}
									</td>
									<td className='categories__tbody-td'>
										{item?.catagory_keyword}
									</td>
									<td className='categories__tbody-td categories__tbody-td-link-main'>
										<button
											className='categories__tbody-td-btn'
											onClick={handleClickModalEdit}
											data-languageid={item?.language_id}
											data-infoid={item?.catagory_info_id}>
											tahrirlash
										</button>
									</td>
									<td className='categories__tbody-td categories__tbody-td-del'>
										<button
											className='categories__delete-btn'
											data-delid={item?.catagory_id}
											onDoubleClick={handleDeleteCategory}>
											o'chirish
										</button>
									</td>
								</tr>
							))}
					</tbody>
				</table>
			</div>

			<EditCategoryModal modal={modal} setModal={setModal} />
		</div>
	)
}

export default CategoriesBox
