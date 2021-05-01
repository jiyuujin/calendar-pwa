export const getJPStandardDateTime = (date?: Date): string => {
    if (date === undefined) {
        return new Date().toLocaleString('en-US', { timeZone: 'Asia/Tokyo' })
    }
    return new Date(date!).toLocaleString('en-US', { timeZone: 'Asia/Tokyo' })
}

export const getDoubleDigits = (num: number) => {
    let tmp: string = String(num)
    tmp += ''
    if (tmp.length === 1) {
        tmp = '0' + tmp
    }
    return tmp
}
