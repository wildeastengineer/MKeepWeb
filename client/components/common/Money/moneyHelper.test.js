import {
    formatMoney,
    formatInteger,
    formatFraction,
    getSign
} from './moneyHelper';

describe('common components', () => {
    describe('Money', () => {
        describe('"formatMoney" method', () => {
            test('it should be defined', () => {
                expect(typeof formatMoney).toBe('function');
            });

            test('it should return correct result', () => {
                const value = 0;

                const result = formatMoney(value);

                expect(result).toEqual('0');
            });

            test('it should return correct result', () => {
                const value = 1;

                const result = formatMoney(value);

                expect(result).toEqual('1,00');
            });

            test('it should return correct result', () => {
                const value = 100;

                const result = formatMoney(value);

                expect(result).toEqual('100,00');
            });

            test('it should return correct result', () => {
                const value = 1000;

                const result = formatMoney(value);

                expect(result).toEqual('1.000,00');
            });

            test('it should return correct result', () => {
                const value = 1000000;

                const result = formatMoney(value);

                expect(result).toEqual('1.000.000,00');
            });

            test('it should return correct result', () => {
                const value = -1;

                const result = formatMoney(value);

                expect(result).toEqual('-1,00');
            });

            test('it should return correct result', () => {
                const value = -100;

                const result = formatMoney(value);

                expect(result).toEqual('-100,00');
            });

            test('it should return correct result', () => {
                const value = -1000;

                const result = formatMoney(value);

                expect(result).toEqual('-1.000,00');
            });

            test('it should return correct result', () => {
                const value = -1000000;

                const result = formatMoney(value);

                expect(result).toEqual('-1.000.000,00');
            });

            test('it should return correct result', () => {
                const value = 1055.563;

                const result = formatMoney(value);

                expect(result).toEqual('1.055,56');
            });

            test('it should return correct result', () => {
                const value = 1777036.457;

                const result = formatMoney(value);

                expect(result).toEqual('1.777.036,46');
            });

            test('it should return correct result', () => {
                const value = -1055.563;

                const result = formatMoney(value);

                expect(result).toEqual('-1.055,56');
            });

            test('it should return correct result', () => {
                const value = -1777036.457;

                const result = formatMoney(value);

                expect(result).toEqual('-1.777.036,46');
            });
        });

        describe('"formatInteger" method', () => {
            test('it should be defined', () => {
                expect(typeof formatInteger).toBe('function');
            });

            test('it should return correct result', () => {
                const value = -1777036.457;

                const result = formatInteger(value);

                expect(result).toEqual('1.777.036');
            });

            test('it should return correct result', () => {
                const value = 7036.457;

                const result = formatInteger(value);

                expect(result).toEqual('7.036');
            });

            test('it should return correct result', () => {
                const value = 907;

                const result = formatInteger(value);

                expect(result).toEqual('907');
            });

            test('it should return correct result', () => {
                const value = 123456;

                const result = formatInteger(value);

                expect(result).toEqual('123.456');
            });

            test('it should return correct result', () => {
                const value = 0;

                const result = formatInteger(value);

                expect(result).toEqual('0');
            });
        });

        describe('"formatFraction" method', () => {
            test('it should be defined', () => {
                expect(typeof formatFraction).toBe('function');
            });

            test('it should return correct result', () => {
                const value = -1777036.457;

                const result = formatFraction(value);

                expect(result).toEqual('46');
            });

            test('it should return correct result', () => {
                const value = 7036.132;

                const result = formatFraction(value);

                expect(result).toEqual('13');
            });

            test('it should return correct result', () => {
                const value = 15;

                const result = formatFraction(value);

                expect(result).toEqual('00');
            });
        });

        describe('"getSign" method', () => {
            test('it should be defined', () => {
                expect(typeof getSign).toBe('function');
            });

            test('it should return correct result', () => {
                const value = -1777036.457;

                const result = getSign(value);

                expect(result).toEqual('-');
            });

            test('it should return correct result', () => {
                const value = 7036.457;

                const result = getSign(value);

                expect(result).toEqual('');
            });

            test('it should return correct result', () => {
                const value = 0;

                const result = getSign(value);

                expect(result).toEqual('');
            });
        });
    });
});
