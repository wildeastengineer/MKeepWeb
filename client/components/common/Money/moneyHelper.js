export const formatMoney = (value) => {
    if (value === 0) {
        return '0';
    }

    return `${getSign(value)}${formatInteger(value)},${formatFraction(value)}`;
};

export const getSign = (value) => {
    return value >= 0 ? '' : '-';
};

export const formatInteger = (value) => {
    let int;

    int = Math.abs(value);
    int = int >= 0 ? Math.floor(int) : Math.ceil(int);
    int = int.toString();

    let valueStr = '';

    for (let i = 0; i < int.length; i++) {
        valueStr = int[int.length - i - 1] + valueStr;

        if ((i + 1) % 3 === 0 && i !== (int.length - 1)) {
            valueStr = '.' + valueStr;
        }
    }

    return valueStr;
};

export const formatFraction = (value) => {
    const fract = Math.abs(Math.round((value * 100) % 100));
    const fractString = fract.toString();

    return fractString + (fractString.length > 1 ? '' : '0');
};
