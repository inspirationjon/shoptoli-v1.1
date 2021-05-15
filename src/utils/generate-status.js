export function generateStatus(number) {
    if (number === 0) {
        return { status: 'savatcha', color: '#48dbfb' }
    } else if (number === 1) {
        return { status: 'buyurtma', color: '#feca57' }
    } else if (number === 2) {
        return { status: 'qabul', color: '#2dccff' }
    } else if (number === 3) {
        return { status: 'yetkazish', color: '#5f27cd' }
    } else if (number === 4) {
        return { status: 'yakun', color: '#10ac84' }
    } else if (number === 5) {
        return { status: 'bekor', color: '#ee5253' }
    } else if (number === 6) {
        return { status: 'toza', color: '#576574' }
    }
}
