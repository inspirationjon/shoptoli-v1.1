import './ClientOne.scss'
import moment from 'moment'
import { generateStatus } from '../../utils/generate-status'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { IconMap } from '../Lib/Svg'

function ClientOne() {
   const [data, setData] = useState()
   const { id } = useParams();

   useEffect(() => {
      fetch(process.env.REACT_APP_API_URL + `/admin/orders/uz/${id}`, {
         headers: {
            'Content-Type': 'application/json',
            token: JSON.parse(window.localStorage.getItem('__auth_provider_token__')).token
         }
      })
         .then(res => res.json())
         .then(data => setData(data.data))
         .catch(err => console.log(err))
   }, [id])

   return (
      
      <div className="clientone">
         {data && <h2 className="clientone-name">{data[0].fullname ? data[0].fullname : data[0].first_name}</h2>}
         {data && <p className="clientone-phone">{data[0].phone}</p>}

         <table className='orders-table'>
            <thead className='orders-table__head'>
               <tr className='orders-table__head-tr'>
                  <th className='orders-table__head-th'>ID</th>
                  <th className='orders-table__head-th'>Sana</th>
                  <th className='orders-table__head-th'>Soni</th>
                  <th className='orders-table__head-th'>Narxi</th>
                  <th className='orders-table__head-th'>Manzil</th>
                  <th className='orders-table__head-th'>Holat</th>
                  {/* <th className='orders-table__head-th'>Ko'proq</th> */}
               </tr>
            </thead>

            <tbody className='orders-table__body'>
               {console.log(data)}
               {
                  data && data.map(item => {
                     return (
                        <tr className='orders-table__body-tr' key={item.id}>
                           <td className='orders-table__body-td'>{item.id}</td>
                           <td className='orders-table__body-td'>
                              {moment(item?.created).format(
                                 'MMMM Do, HH:mm'
                              )}
                           </td>
                           <td className='orders-table__body-td'>{item.sum_quantity}</td>
                           <td className='orders-table__body-td'>{item.price} so'm</td>
                           <td className='orders-table__body-td'>
                              <a
                                 className='orders-table__body-td-map-link'
                                 target='__blank'
                                 href={`https://www.google.com/maps/place/${item.latitude},${item.longitude}`}>
                                 <IconMap />
                              </a>
                           </td>
                           <td className='orders-table__body-td'>
                           <button
                                        className='orders-table__body-td--pending'
                                        title='doubleclick to change status'
                                        style={{
                                            backgroundColor: generateStatus(
                                             item?.status
                                            ).color,
                                        }}>
                                        {generateStatus(item?.status).status}
                                    </button>
                           </td>
                           {/* <td className='orders-table__body-td'></td> */}
                           {/* <td className='orders-table__body-td'></td> */}
                           {/* <td className='orders-table__body-td '></td> */}
                        </tr>
                     )
                  })
               }

            </tbody>
         </table>
      </div>
   )
}

export default ClientOne
