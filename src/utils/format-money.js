function formatMoney(number) {
    return new Intl.NumberFormat('uz-Uz', {
        style: 'currency',
        currency: 'UZS',
    }).format(number)
}

export { formatMoney }
