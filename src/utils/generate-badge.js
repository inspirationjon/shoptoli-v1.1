export function generateBadge(number) {
    if (number === 0) {
        return { status: 'bronze', color: '#CD7F32' }
    } else if (number === 1) {
        return { status: 'silver', color: ' #C0C0C0' }
    } else if (number === 2) {
        return { status: 'gold', color: '#FFD700' }
    } else if (number === 3) {
        return { status: 'vip', color: '#40A7E3' }
    }
}
