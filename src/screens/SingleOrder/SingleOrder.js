import React from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { client } from '../../utils/api-client'
import { generateStatus } from '../../utils/generate-status'
import { formatMoney } from '../../utils/format-money'
import { IconRu, IconUz, IconMap, IconPhone } from '../../components/Lib/Svg'
import { TableLoader } from '../../components/Lib/Loader'
import useAuth from '../../hooks/useAuth'
import moment from 'moment'
import './SingleOrder.scss'

function SingleOrder() {
    const { id } = useParams()
    const [auth] = useAuth()

    const { data, isLoading, isSuccess } = useQuery({
        queryKey: 'single-order',
        queryFn: () => client('admin/order/uz/' + id, { token: auth.token }),
    })

    const order = isSuccess && data?.data[0]

    return (
        <>
            <div className='single-order__wrapper'>
                {isLoading && (
                    <TableLoader className={'single-order__loader'} />
                )}

                {isSuccess && (
                    <>
                        <div className='single-order__header'>
                            <div className='single-order__flag-wrapper'>
                                <h3 className='single-order__client-name'>
                                    {order?.first_name}
                                </h3>
                                {order?.language === 'uz' ? (
                                    <IconUz />
                                ) : (
                                    <IconRu />
                                )}
                            </div>
                            <time className='single-order__time'>
                                <strong>Buyurtma vaqti: </strong>
                                {moment(order?.created).format(
                                    'MMMM Do, HH:mm'
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
                                    href={`https://www.google.com/maps/place/${order.latitude},${order.longitude}`}
                                    target='__blank'>
                                    <h3 className='single-order__location-heading'>
                                        Manzil
                                    </h3>
                                    <IconMap />
                                </a>

                                <div className='single-order__status-wrapper'>
                                    <h3 className='single-order__status-heading'>
                                        Status
                                    </h3>

                                    <button
                                        className='single-order__status-btn single-order__status-btn'
                                        title='click to change status'
                                        style={{
                                            backgroundColor: generateStatus(
                                                order?.status
                                            ).color,
                                        }}>
                                        {generateStatus(order?.status).status}
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
                                        <th className='single-order-table__head-th'>
                                            Sotuvda
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className='single-order-table__body'>
                                    <tr className='single-order-table__body-td'>
                                        {order.client_orders[0]
                                            .split(';')
                                            .map((n, index) => (
                                                <td
                                                    className='single-order-table__body-td'
                                                    key={index}>
                                                    {n}
                                                </td>
                                            ))}
                                    </tr>
                                </tbody>
                                <caption className='single-order-table__caption'>
                                    Jami:{' '}
                                    <strong>{formatMoney(order?.price)}</strong>
                                </caption>
                            </table>
                        </div>
                    </>
                )}
            </div>
        </>
    )
}

export default SingleOrder
