import React from 'react';
import { useQuery } from 'react-query';
import { Link, useParams } from 'react-router-dom';
import { client } from '../../utils/api-client';
import { generateStatus } from '../../utils/generate-status';
import { generateBadge } from '../../utils/generate-badge';
import { formatMoney } from '../../utils/format-money';
import {
	IconRu,
	IconUz,
	IconMap,
	IconPhone,
	IconBadge,
	IconBack,
} from '../../components/Lib/Svg';
import { TableLoader } from '../../components/Lib/Loader';
import useAuth from '../../hooks/useAuth';
import moment from 'moment';
import './SingleOrder.scss';
import StatusModal from '../../components/StatusModal/StatusModal';

function SingleOrder() {
	const { id } = useParams();
	const [auth] = useAuth();

	const { data, isLoading, isSuccess } = useQuery({
		queryKey: 'single-order',
		queryFn: () => client('admin/order/uz/' + id, { token: auth.token }),
	});

	const order = isSuccess && data?.data[0];

	const [modal, setModal] = React.useState({});

	function handleClickModalStatus(evt) {
		setModal({
			open: true,
			order_id: evt.target.dataset.orderid,
			order_status: evt.target.dataset.orderstatus,
		});
	}

	return (
		<>
			<div className='single-order__wrapper'>
				{isLoading && (
					<TableLoader className={'single-order__loader'} />
				)}

				{isSuccess && (
					<>
						<div className='single-order__header'>
							<Link className='single-order__back-link' to='/'>
								<IconBack />
							</Link>
							<div className='single-order__flag-wrapper'>
								{order?.language === 'uz' ? (
									<IconUz className='single-order__lang-icon' />
								) : (
									<IconRu className='single-order__lang-icon' />
								)}

								<IconBadge
									className='single-order__badge'
									color={generateBadge(order?.badge)?.color}
								/>

								<h3 className='single-order__client-name'>
									{order?.first_name}
								</h3>
							</div>
							<time className='single-order__time'>
								<strong>Buyurtma vaqti: </strong>
								{moment(order?.created).format(
									'MMMM Do, HH:mm',
								)}
							</time>
							<a
								href={'tel:' + order?.phone}
								className='single-order__tel-link'>
								<IconPhone />
								{order?.phone}
							</a>
						</div>

						<div className='single-order__content'>
							<div className='single-order__content-top'>
								<a
									className='single-order__location-link'
									href={`https://www.google.com/maps/place/${order?.latitude},${order?.longitude}`}
									target='__blank'>
									<h3 className='single-order__location-heading'>
										Manzil
									</h3>
									<IconMap />
								</a>

								<div className='single-order__status-wrapper'>
									<h3 className='single-order__status-heading'>
										Holat
									</h3>

									<button
										className='single-order__status-btn single-order__status-btn'
										title='doubleclick to change status'
										data-orderid={order?.id}
										data-orderstatus={order?.status}
										onDoubleClick={handleClickModalStatus}
										style={{
											backgroundColor: generateStatus(
												order?.status,
											)?.color,
										}}>
										{generateStatus(order?.status)?.status}
									</button>
								</div>
							</div>

							<table className='single-order-table'>
								<thead className='single-order-table__head'>
									<tr className='single-order-table__head-tr'>
										<th className='single-order-table__head-th'>
											Mahsulot
										</th>
										<th className='single-order-table__head-th'>
											Miqdori
										</th>
										<th className='single-order-table__head-th'>
											Narxi
										</th>
									</tr>
								</thead>
								<tbody className='single-order-table__body'>
									{order?.orders?.map((n, index) => {
										return (
											<tr
												className='single-order-table__body-td'
												key={index + Math.random()}>
												<td className='single-order-table__body-td'>
													{n?.name}
												</td>
												<td className='single-order-table__body-td'>
													{n?.quantity}
												</td>
												<td className='single-order-table__body-td'>
													{n?.price}
												</td>
											</tr>
										);
									})}
								</tbody>
								<caption className='single-order-table__caption'>
									<p>
										Jami:{' '}
										<strong>
											{formatMoney(order?.price)}{' '}
										</strong>
									</p>
									<p>
										Yetkazib berish:{' '}
										<strong>
											{formatMoney(order?.delivery)}{' '}
										</strong>
									</p>
								</caption>
							</table>
						</div>
					</>
				)}

				<StatusModal modal={modal} setModal={setModal} />
			</div>
		</>
	);
}

export default SingleOrder;
