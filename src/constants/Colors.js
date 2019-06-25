const colors = {
    primary: '#4B70F3',
    primaryHover: '#3B5DD9',
    primaryOpacity: '#C2CEFB',
    secondary: '#515973',
    main: '#0A1333',
    divider: '#E9EBF3',
    error: '#ED5052',
    background: '#FAFBFF',
    success: '#20DDAD',
    alert: '#FEC754',
    white: '#FFFFFF',
}

export const getColorByStatus = status => {
    switch (status) {
        case 'Not registered':
            return colors.error
        case 'Infrequent':
            return colors.alert
        case 'Regular':
            return colors.success
        default:
            return colors.primary
    }
}

export default colors