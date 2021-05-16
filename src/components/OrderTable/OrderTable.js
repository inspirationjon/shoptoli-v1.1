import React from 'react'
import { Link } from 'react-router-dom'
import { client } from '../../utils/api-client'
import { generateStatus } from '../../utils/generate-status'
import { generateBadge } from '../../utils/generate-badge'
import TablePaginationController from '../TablePaginationController/TablePaginationController'
import StatusModal from '../StatusModal/StatusModal'
import { IconMoreLink, IconMap, IconRu, IconUz, IconBadge } from '../Lib/Svg'
import './OrderTable.scss'
import { TableLoader } from '../Lib/Loader'
import moment from 'moment'
import useAuth from '../../hooks/useAuth'
import { useQuery } from 'react-query'
import clientIO from 'socket.io-client'

function OrderTable() {
    const socket = clientIO(process.env.REACT_APP_API_URL, {
        transports: ['websocket'],
    })

    socket.on('client_order', (obj) => {
        if (obj) {
            refetch()
        }
    })

    const [auth, setAuth] = useAuth()
    const [page, setPage] = React.useState(1)

    React.useEffect(() => {
        client('admin/orders/uz/5/1', { token: auth.token }).then(
            (response) => {
                if (response.code === 401) {
                    setAuth(false)
                }
            }
        )
    }, [auth.token, setAuth])

    const fetchProjects = (page = 0) =>
        client('admin/orders/uz/5/' + page, { token: auth.token })

    const {
        data: orders,
        isError,
        isLoading,
        isSuccess,
        refetch,
    } = useQuery(['orders', page], () => fetchProjects(page), {
        keepPreviousData: true,
    })

    const [modal, setModal] = React.useState({})

    function handleClickModalStatus(evt) {
        setModal({
            open: true,
            order_id: evt.target.dataset.orderid,
            order_status: evt.target.dataset.orderstatus,
        })
    }
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
                        <th className='orders-table__head-th'>Holat</th>
                        <th className='orders-table__head-th'>Ko'proq</th>
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
                                        {item?.id}
                                    </td>

                                    <td className='orders-table__body-td'>
                                        {moment(item?.created)?.format(
                                            'MMMM Do, HH:mm'
                                        )}
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
                                        {item?.sum_quantity}
                                    </td>

                                    <td className='orders-table__body-td'>
                                        {item?.price}
                                    </td>

                                    <td className='orders-table__body-td'>
                                        <a
                                            className='orders-table__body-td-map-link'
                                            target='__blank'
                                            href={`https://www.google.com/maps/place/${item?.latitude},${item?.longitude}`}>
                                            <IconMap />
                                        </a>
                                    </td>
                                    <td className='orders-table__body-td orders-table__body-td-status'>
                                        <button
                                            className='orders-table__body-td--pending'
                                            title='click to change status'
                                            data-orderid={item?.id}
                                            data-orderstatus={item?.status}
                                            onDoubleClick={
                                                handleClickModalStatus
                                            }
                                            style={{
                                                backgroundColor: generateStatus(
                                                    item?.status
                                                )?.color,
                                            }}>
                                            {
                                                generateStatus(item?.status)
                                                    ?.status
                                            }
                                        </button>
                                    </td>

                                    <td className='orders-table__body-td '>
                                        <Link
                                            to={`/order/${item?.id}`}
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

            <StatusModal modal={modal} setModal={setModal} />
        </div>
    )
}

export default OrderTable
