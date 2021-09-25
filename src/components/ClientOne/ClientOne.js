import './ClientOne.scss';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { generateBadge } from '../../utils/generate-badge';
import { generateStatus } from '../../utils/generate-status';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { IconMoreLink, IconMap, IconBadge } from '../Lib/Svg';

function ClientOne() {
	const [data, setData] = useState();
	const [map, setMap] = useState(data);
	const { id } = useParams();

	useEffect(() => {
		fetch(process.env.REACT_APP_API_URL + `/admin/orders/uz/${id}`, {
			headers: {
				'Content-Type': 'application/json',
				token: JSON.parse(
					window.localStorage.getItem('__auth_provider_token__'),
				).token,
			},
		})
			.then((res) => res.json())
			.then((data) => {
				setData(data?.data);
				setMap(data?.data);
			})
			.catch((err) => console.log(err));
	}, [id]);

	function filterData(evt) {
		if (evt.target.value !== '7') {
			setMap(
				data.filter((item) => item.status === Number(evt.target.value)),
			);
		} else {
			setMap(data);
		}
	}

	return (
		<div className='clientone'>
			<div className='clientone__info'>
				<div>
					<div>
						{data && (
							<h2 className='clientone-name'>
								{data[0]?.fullname
									? data[0]?.fullname
									: data[0]?.first_name}
							</h2>
						)}
						{data && (
							<p className='clientone-phone'>{data[0]?.phone}</p>
						)}
					</div>

					<div className='clientone__badge'>
						{data && (
							<IconBadge
								className='orders-table__client-badge'
								color={generateBadge(data[0]?.badge)?.color}
							/>
						)}
					</div>
				</div>

				<select className='clientone__select' onChange={filterData}>
					<option value='7'>all</option>
					<option value='0'>cart</option>
					<option value='1'>ordered</option>
					<option value='2'>verified</option>
					<option value='3'>delivery</option>
					<option value='4'>completed</option>
					<option value='5'>cancelled</option>
					<option value='6'>cleaned</option>
				</select>

				<p className='order-sum'>
					<span className='order-sum__bold'>Jami:</span>
					<span>{map?.length}</span>
				</p>
			</div>

			<div className='clientone__table'>
				<table className='orders-table'>
					<thead className='orders-table__head'>
						<tr className='orders-table__head-tr'>
							<th className='orders-table__head-th'>ID</th>
							<th className='orders-table__head-th'>Sana</th>
							<th className='orders-table__head-th'>Soni</th>
							<th className='orders-table__head-th'>Narxi</th>
							<th className='orders-table__head-th'>Manzil</th>
							<th className='orders-table__head-th'>Holat</th>
							<th className='orders-table__head-th'>Batafsil</th>
						</tr>
					</thead>

					<tbody className='orders-table__body'>
						{console.log(data)}
						{data &&
							map?.map((item) => {
								return (
									<tr
										className='orders-table__body-tr'
										key={item?.id}>
										<td className='orders-table__body-td'>
											{item?.id}
										</td>
										<td className='orders-table__body-td'>
											{moment(item?.created).format(
												'MMMM Do, HH:mm',
											)}
										</td>
										<td className='orders-table__body-td'>
											{item?.sum_quantity}
										</td>
										<td className='orders-table__body-td'>
											{item?.price} so'm
										</td>
										<td className='orders-table__body-td'>
											<a
												className='orders-table__body-td-map-link'
												target='__blank'
												href={`https://www.google.com/maps/place/${item?.latitude},${item?.longitude}`}>
												<IconMap />
											</a>
										</td>
										<td className='orders-table__body-td'>
											<button
												className='orders-table__body-td--pending'
												title='doubleclick to change status'
												style={{
													backgroundColor:
														generateStatus(
															item?.status,
														)?.color,
												}}>
												{
													generateStatus(item?.status)
														?.status
												}
											</button>
										</td>
										<td className='orders-table__body-td'>
											<Link
												className='orders-table__body-td--more-link'
												to={`/order/${item.id}`}>
												<IconMoreLink />
											</Link>
										</td>
									</tr>
								);
							})}
					</tbody>
				</table>
			</div>
		</div>
	);
}

export default ClientOne;
