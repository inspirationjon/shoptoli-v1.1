import React from 'react'
import { Link } from 'react-router-dom'
import { client } from '../../utils/api-client'
import TablePaginationController from '../TablePaginationController/TablePaginationController'
import { IconMoreLink, IconPending, IconMap } from '../Lib/Svg'
import './UsersTable.scss'
import { TableLoader } from '../Lib/Loader'
import moment from 'moment'
import useAuth from '../../hooks/useAuth'
import { useQuery } from 'react-query'

function UsersTable() {
    const [auth] = useAuth()
    const [page, setPage] = React.useState(1)

    const fetchProjects = (page = 0) =>
        client('admin/users/uz/7/' + page, { token: auth.token })

    const { data: users, isError, isLoading, isSuccess } = useQuery(
        ['questions', page],
        () => fetchProjects(page),
        { keepPreviousData: true }
    )

    return (
        <div className='users-table__wrapper'>
            <table className='users-table'>
                <thead className='users-table__head'>
                    <tr className='users-table__head-tr'>
                        <th className='users-table__head-th'>ID</th>
                        <th className='users-table__head-th'>Sana</th>
                        <th className='users-table__head-th'>Ism</th>
                        <th className='users-table__head-th'>Telefon raqam</th>
                        <th className='users-table__head-th'>Buyurtma nomi</th>
                        <th className='users-table__head-th'>Soni</th>
                        <th className='users-table__head-th'>Narxi</th>
                        <th className='users-table__head-th'>Manzil</th>
                        <th className='users-table__head-th'>Status</th>
                        <th className='users-table__head-th'>More</th>
                    </tr>
                </thead>

                {isError ? 'Error' : null}

                {isSuccess ? (
                    <>
                        <tbody className='users-table__body'>
                            {users?.data?.map((item) => (
                                <tr
                                    className='users-table__body-tr'
                                    key={item.created}>
                                    <td className='users-table__body-td'>
                                        {item?.client_id}
                                    </td>

                                    <td className='users-table__body-td'>
                                        {moment(item?.created).format('L')}
                                    </td>

                                    <td className='users-table__body-td'>
                                        <a
                                            href='#tme'
                                            className='users-table__body-td-link'>
                                            {item?.first_name}
                                        </a>
                                    </td>

                                    <td className='users-table__body-td'>
                                        <a
                                            href={'tel:' + item?.phone}
                                            className='users-table__body-td-link'>
                                            {item?.phone}
                                        </a>
                                    </td>

                                    <td className='users-table__body-td'>
                                        {item?.name.join(', ')}
                                    </td>

                                    <td className='users-table__body-td'>
                                        {
                                            item?.quantity.map(
                                                (item) => (item += item)
                                            )[0]
                                        }
                                    </td>

                                    <td className='users-table__body-td'>
                                        {item?.price}
                                    </td>

                                    <td className='users-table__body-td'>
                                        <a
                                            className='users-table__body-td-map-link'
                                            target='blank'
                                            href={`https://www.google.com/maps/place/${item.latitude},${item.longitude}`}>
                                            <IconMap />
                                        </a>
                                    </td>
                                    <td className='users-table__body-td '>
                                        <a
                                            className='users-table__body-td--pending'
                                            href='#dwdw'>
                                            <IconPending />
                                            {item?.status === 1
                                                ? 'Pending'
                                                : 'Canceled'}
                                        </a>
                                    </td>
                                    <td className='users-table__body-td '>
                                        <Link
                                            to={`/client-order/${item.client_id}`}
                                            className='users-table__body-td--more-link'
                                            href='#dwdw'>
                                            <IconMoreLink />
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </>
                ) : null}
            </table>
            {isLoading ? <TableLoader className='users-table__loader' /> : null}

            <TablePaginationController
                className='users-table__controller'
                setPage={setPage}
                noPrev={page === 1 ? true : false}
                noNext={users?.data?.length ? false : true}
            />
        </div>
    )
}

export default UsersTable
