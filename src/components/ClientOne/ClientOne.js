import './ClientOne.scss'
import {useParams} from 'react-router-dom'

function ClientOne () {
   const { id } = useParams();
   console.log(id);
   return(
      <div className="clientone">
         <h2 className="clientone-name">Shuhratbek Qobulov</h2>
         <p className="clientone-phone">+998902045988</p>
      </div>
   )
}

export default ClientOne
