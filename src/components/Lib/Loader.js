import React from 'react'
import LoaderTable from '../../assets/images/200.gif'

function TableLoader({className}) {
    return <img className={className} src={LoaderTable} alt='Simple Loader' width='200' height='200' />
}

export { TableLoader }
