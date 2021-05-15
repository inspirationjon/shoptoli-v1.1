import { useEffect, useRef, useState } from 'react'
import './ChangeInfo.scss'

function ChangeInfo() {
   const postMethod = "POST"
   const updateMethod = "PUT"
   const [data, setData] = useState({})
   const companyName = useRef()
   const catalogLink = useRef()
   const mediaLink = useRef()
   const phone = useRef()
   const adress = useRef()
   const email = useRef()
   const deliveryPrice = useRef()
   const freeDeliveryLimit = useRef()

   useEffect(() => {
      if (data) {
         companyName.current.value = data.info_company_name
         catalogLink.current.value = data.info_catalog_link
         mediaLink.current.value = data.info_media
         phone.current.value = data.info_phone
         adress.current.value = data.info_address
         email.current.value = data.info_email
         deliveryPrice.current.value = data.info_delivery_price
         freeDeliveryLimit.current.value = data.info_free_delivery_limit
      }
   }, [data])

   useEffect(() => {
      
      fetch(process.env.REACT_APP_API_URL + '/admin/infos', {
         headers: {
            'Content-Type': 'application/json',
            token: JSON.parse(window.localStorage.getItem('__auth_provider_token__')).token
         }
      })
      .then(res => res.json())
      .then(res => setData(res.data[0]))
   }, [])

   function changeCompanyInfo(evt) {
      evt.preventDefault()

      const data = {
         "info_company_name": companyName.current.value,
         "info_catalog_link": catalogLink.current.value,
         "info_media": mediaLink.current.value,
         "info_phone": phone.current.value,
         "info_address": adress.current.value,
         "info_email": email.current.value,
         "info_delivery_price": Number(deliveryPrice.current.value),
         "info_free_delivery_limit": Number(freeDeliveryLimit.current.value),
         "info_id": 1
      }

      fetch(process.env.REACT_APP_API_URL + '/admin/infos', {
         method: data ? updateMethod : postMethod,
         body: JSON.stringify(data),
         headers: {
            'Content-Type': 'application/json',
            token: JSON.parse(window.localStorage.getItem('__auth_provider_token__')).token
         }
      })
      .then(res => console.log(res))
      // .then(res => console.log(res))
      .catch(err => console.log(err))
   }

   return (
      <div>
         <form className="change-info__form" onSubmit={changeCompanyInfo}>
            <input
               ref={companyName}
               className="create-user__input"
               type="text"
               placeholder="Company name"
               required
            />
            <input
               ref={catalogLink}
               className="create-user__input"
               type="text"
               placeholder="Catalog link"
               required
            />
            <input
               ref={mediaLink}
               className="create-user__input"
               type="text"
               placeholder="Media link"
               required
            />
            <input
               ref={phone}
               className="create-user__input"
               type="text"
               placeholder="Phone"
               required
            />
            <input
               ref={adress}
               className="create-user__input"
               type="text"
               placeholder="Adress"
               required
            />
            <input
               ref={email}
               className="create-user__input"
               type="text"
               placeholder="Email"
               required
            />
            <input
               ref={deliveryPrice}
               className="create-user__input"
               type="text"
               placeholder="Delivery price"
               required
            />
            <input
               ref={freeDeliveryLimit}
               className="create-user__input"
               type="text"
               placeholder="Free delivery limit"
               required
            />
            <button className="create-user__btn change-btn" type="submit">
               {data ? 'Update' : 'Create'}
            </button>
         </form>
      </div>
   )
}

export default ChangeInfo
