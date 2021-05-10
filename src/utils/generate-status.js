export function generateStatus(number) {
    if (number === 0) {
        return { status: 'card', color: '#9ea7ad' }
    } else if (number === 1) {
        return { status: 'ordered', color: '#ffb302' }
    } else if (number === 2) {
        return { status: 'verified', color: '#2dccff' }
    } else if (number === 3) {
        return { status: 'delivery', color: '#fce83a' }
    } else if (number === 4) {
        return { status: 'completed', color: '#56f000' }
    } else if (number === 5) {
        return { status: 'cancelled', color: '#ff3838' }
    } else if (number === 6) {
        return { status: 'cleaned', color: '#8bcdcd' }
    }
}
