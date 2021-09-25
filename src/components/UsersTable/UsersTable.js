import React from 'react';
import { Link } from 'react-router-dom';
import { client } from '../../utils/api-client';
import { generateBadge } from '../../utils/generate-badge';
import TablePaginationController from '../TablePaginationController/TablePaginationController';
import { IconRu, IconUz, IconBadge } from '../Lib/Svg';
import './UsersTable.scss';
import { TableLoader } from '../Lib/Loader';
import useAuth from '../../hooks/useAuth';
import { useQuery } from 'react-query';

function UsersTable() {
	const [auth] = useAuth();
	const [page, setPage] = React.useState(1);

	const fetchProjects = (page = 1) =>
		client('admin/clients/uz/5/' + page, { token: auth.token });

	const {
		data: orders,
		isError,
		isLoading,
		isSuccess,
	} = useQuery(['users', page], () => fetchProjects(page), {
		keepPreviousData: true,
	});

	return (
		<div className='orders-table__wrapper'>
			<table className='orders-table'>
				<thead className='orders-table__head'>
					<tr className='orders-table__head-tr'>
						<th className='orders-table__head-th'>ID</th>
						<th className='orders-table__head-th'>Ism</th>
						<th className='orders-table__head-th'>Telefon raqam</th>
						<th className='orders-table__head-th'>Buyurtmalar</th>
						<th className='orders-table__head-th'>Manzil</th>
					</tr>
				</thead>

				{isError ? 'Error' : null}
				<tbody className='orders-table__body'>
					{isSuccess ? (
						<>
							{orders?.data?.map((item) => (
								<tr
									className='orders-table__body-tr'
									key={Math.random()}>
									<td className='orders-table__body-td'>
										{item?.client_id}
									</td>

									<td className='orders-table__body-td orders-table__body-td-name-td'>
										{item?.language === 'uz' ? (
											<IconUz className='orders-table__lang-icon' />
										) : (
											<IconRu className='orders-table__lang-icon' />
										)}
										<IconBadge
											className='orders-table__client-badge'
											color={
												generateBadge(item?.badge)
													?.color
											}
										/>
										<p className='orders-table__body-td-name'>
											<Link
												className='orders-table__body-td-name-link'
												to={
													'/clients/' +
													item?.client_id
												}>
												{item?.first_name}
											</Link>
										</p>
									</td>

									<td className='orders-table__body-td'>
										<a
											href={'tel:' + item?.phone}
											className='orders-table__body-td-link'>
											{item?.phone}
										</a>
									</td>

									<td className='orders-table__body-td'>
										{item?.all_orders}
									</td>

									<td className='orders-table__body-td'>
										{item?.region}
									</td>
								</tr>
							))}
						</>
					) : null}
				</tbody>
			</table>
			{isLoading ? (
				<TableLoader className='orders-table__loader' />
			) : null}

			<TablePaginationController
				className='orders-table__controller'
				setPage={setPage}
				noPrev={page === 1 ? true : false}
				noNext={orders?.data?.length ? false : true}
			/>
		</div>
	);
}

export default UsersTable;
