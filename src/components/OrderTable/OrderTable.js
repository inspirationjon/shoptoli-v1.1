import React from 'react'
import { Link } from 'react-router-dom'
import { client } from '../../utils/api-client'
import { generateStatus } from '../../utils/generate-status'
import TablePaginationController from '../TablePaginationController/TablePaginationController'
import StatusModal from '../StatusModal/StatusModal'
import { IconMoreLink, IconMap, IconRu, IconUz } from '../Lib/Svg'
import './OrderTable.scss'
import { TableLoader } from '../Lib/Loader'
import moment from 'moment'
import useUser from '../../hooks/useAuth'
import { useQuery } from 'react-query'
import clientIO from 'socket.io-client'

function OrderTable() {
    const socket = clientIO(process.env.REACT_APP_API_URL, {
        transports: ['websocket'],
    })

    const [news, setNews] = React.useState(null)

    socket.on('client_order', (obj) => {
        setNews(obj)
    })

    const [user] = useUser()
    const [page, setPage] = React.useState(1)

    const fetchProjects = (page = 0) =>
        client('admin/orders/uz/5/' + page, { token: user.token })

    const {
        data: orders,
        isError,
        isLoading,
        isSuccess,
    } = useQuery(['orders', page], () => fetchProjects(page), {
        keepPreviousData: true,
    })

    return (
        <div className='orders-table__wrapper'>
            <table className='orders-table'>
                <thead className='orders-table__head'>
                    <tr className='orders-table__head-tr'>
                        <th className='orders-table__head-th'>ID</th>
                        <th className='orders-table__head-th'>Sana</th>
                        <th className='orders-table__head-th'>Ism</th>
                        <th className='orders-table__head-th'>Telefon raqam</th>
                        <th className='orders-table__head-th'>Soni</th>
                        <th className='orders-table__head-th'>Narxi</th>
                        <th className='orders-table__head-th'>Manzil</th>
                        <th className='orders-table__head-th'>Status</th>
                        <th className='orders-table__head-th'>More</th>
                    </tr>
                </thead>

                {isError ? 'Error' : null}
                <tbody className='orders-table__body'>
                    {news &&
                        news?.map((n) => (
                            <tr
                                className='orders-table__body-tr'
                                key={n.created}>
                                <td className='orders-table__body-td'>
                                    {n.id}
                                </td>

                                <td className='orders-table__body-td'>
                                    {moment(n?.created).format(
                                        'MMMM Do, HH:mm'
                                    )}
                                </td>

                                <td className='orders-table__body-td orders-table__body-td-name-td'>
                                    {n?.language === 'ru' ? (
                                        <IconRu />
                                    ) : (
                                        <IconUz />
                                    )}
                                    <p className='orders-table__body-td-name'>
                                        {n?.first_name}
                                    </p>
                                </td>

                                <td className='orders-table__body-td'>
                                    <a
                                        href={'tel:' + n?.phone}
                                        className='orders-table__body-td-link'>
                                        {n?.phone}
                                    </a>
                                </td>

                                <td className='orders-table__body-td'>
                                    {n?.sum_quantity}
                                </td>

                                <td className='orders-table__body-td'>
                                    {n?.price}
                                </td>

                                <td className='orders-table__body-td'>
                                    <a
                                        className='orders-table__body-td-map-link'
                                        target='__blank'
                                        href={`https://www.google.com/maps/place/${n.latitude},${n.longitude}`}>
                                        <IconMap />
                                    </a>
                                </td>
                                <td className='orders-table__body-td'>
                                    <button
                                        className='orders-table__body-td--pending'
                                        title='click to change status'
                                        style={{
                                            backgroundColor: generateStatus(
                                                n?.status
                                            ).color,
                                        }}>
                                        {generateStatus(n?.status).status}
                                    </button>
                                </td>

                                <td className='orders-table__body-td '>
                                    <Link
                                        to={`/order/${n.id}`}
                                        className='orders-table__body-td--more-link'>
                                        <IconMoreLink />
                                    </Link>
                                </td>
                            </tr>
                        ))}

                    {isSuccess ? (
                        <>
                            {orders?.data?.map((item, index) => (
                                <tr
                                    className='orders-table__body-tr'
                                    key={item.created}>
                                    <td className='orders-table__body-td'>
                                        {item?.id}
                                    </td>

                                    <td className='orders-table__body-td'>
                                        {moment(item?.created).format(
                                            'MMMM Do, HH:mm'
                                        )}
                                    </td>

                                    <td className='orders-table__body-td orders-table__body-td-name-td'>
                                        {item?.language === 'uz' ? (
                                            <IconUz />
                                        ) : (
                                            <IconRu />
                                        )}
                                        <p className='orders-table__body-td-name'>
                                            {item?.first_name}
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
                                        {item?.sum_quantity}
                                    </td>

                                    <td className='orders-table__body-td'>
                                        {item?.price}
                                    </td>

                                    <td className='orders-table__body-td'>
                                        <a
                                            className='orders-table__body-td-map-link'
                                            target='__blank'
                                            href={`https://www.google.com/maps/place/${item.latitude},${item.longitude}`}>
                                            <IconMap />
                                        </a>
                                    </td>
                                    <td className='orders-table__body-td orders-table__body-td-status'>
                                        <button
                                            className='orders-table__body-td--pending'
                                            title='click to change status'
                                            style={{
                                                backgroundColor: generateStatus(
                                                    item?.status
                                                ).color,
                                            }}>
                                            {
                                                generateStatus(item?.status)
                                                    .status
                                            }
                                        </button>
                                    </td>

                                    <td className='orders-table__body-td '>
                                        <Link
                                            to={`/order/${item.id}`}
                                            className='orders-table__body-td--more-link'>
                                            <IconMoreLink />
                                        </Link>
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

            <StatusModal />
        </div>
    )
}

export default OrderTable
