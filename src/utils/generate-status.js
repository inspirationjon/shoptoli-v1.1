export function generateStatus(number) {
    if (number === 1) {
        return { status: 'ordered', color: '#feca57' }
    } else if (number === 2) {
        return { status: 'verified', color: '#2dccff' }
    } else if (number === 3) {
        return { status: 'delivery', color: ' #5f27cd' }
    } else if (number === 4) {
        return { status: 'completed', color: '#10ac84' }
    }
}
