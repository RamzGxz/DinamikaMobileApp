const getIndonesianDate = (date) => {
    const options = {
        timeZone: 'Asia/Jakarta',
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    }

    return date.toLocaleString('id-ID', options)
}
module.exports = getIndonesianDate