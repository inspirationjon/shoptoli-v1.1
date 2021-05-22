import React from 'react'
import { Line } from 'react-chartjs-2'
import { client } from '../../utils/api-client'
import { useQuery } from 'react-query'
import moment from 'moment'

function Statistics() {
	const data = {
		labels: ['january', 'december'],
		datasets: [
			{
				label: 's',
				fill: false,
				data: [2, 44],
				borderColor: ['#8fd6e1'],
				backgroundColor: ['#8fd6e1'],
				pointBackgroundColor: ['#1597bb'],
				pointBorderdColor: ['#8fd6e1'],
			},
		],
	}
	return (
		<div style={{ maxWidth: '1000px' }}>
			<Line data={data} width='500' />
		</div>
	)
}

export default Statistics
