export const formatDate = (date, format) => {
    let dayFormat = format.match(/d+/);
    let monthFormat = format.match(/m+/);
    let yearFormat = format.match(/y+/);

    dayFormat = dayFormat ? dayFormat[0] : '';
    monthFormat = monthFormat ? monthFormat[0] : '';
    yearFormat = yearFormat ? yearFormat[0] : '';

    const formattedDay = getFormattedDay(date, dayFormat);
    const formattedMonth = getFormattedMonth(date, monthFormat);
    const formattedYear = getFormattedYear(date, yearFormat);

    return format
        .replace(dayFormat, formattedDay)
        .replace(monthFormat, formattedMonth)
        .replace(yearFormat, formattedYear);
};

export const getFormattedDay = (date, dayFormat) => {
    if (!dayFormat) {
        return '';
    }

    let dayStr = date.getDate().toString();
    const indent = Math.max(dayFormat.length - dayStr.length, 0);

    for (let i = 0; i < indent; i++) {
        dayStr = '0' + dayStr;
    }

    return dayStr;
};

export const getFormattedMonth = (date, monthFormat) => {
    if (!monthFormat) {
        return '';
    }

    let monthStr = (date.getMonth() + 1).toString();
    const indent = Math.max(monthFormat.length - monthStr.length, 0);

    for (let i = 0; i < indent; i++) {
        monthStr = '0' + monthStr;
    }

    return monthStr;
};

export const getFormattedYear = (date, yearFormat) => {
    if (!yearFormat) {
        return '';
    }

    return date.getFullYear().toString();
};
