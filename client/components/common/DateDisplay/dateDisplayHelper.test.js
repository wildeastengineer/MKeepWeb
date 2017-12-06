import {
    formatDate,
    getFormattedDay,
    getFormattedMonth,
    getFormattedYear
} from './dateDisplayHelper';

describe('common components', () => {
    describe('DateDisplay', () => {
        describe('"formatDate" method', () => {
            test('it should be defined', () => {
                expect(typeof formatDate).toBe('function');
            });

            test('it should return correct result', () => {
                const date = new Date('Wed Dec 13 2017 09:06:02 GMT+0400 (+04)');
                const format = 'dd.mm.yyyy';

                const formattedDate = formatDate(date, format);

                expect(formattedDate).toEqual('13.12.2017');
            });

            test('it should return correct result', () => {
                const date = new Date('Wed Dec 3 2017 09:06:02 GMT+0400 (+04)');
                const format = 'dd.mm.yyyy';

                const formattedDate = formatDate(date, format);

                expect(formattedDate).toEqual('03.12.2017');
            });
        });

        describe('"getFormattedDay" method', () => {
            test('it should be defined', () => {
                expect(typeof getFormattedDay).toBe('function');
            });

            test('it should return correct result', () => {
                const date = new Date('Wed Dec 13 2017 09:06:02 GMT+0400 (+04)');
                const format = 'dd';

                const formattedDay = getFormattedDay(date, format);

                expect(formattedDay).toEqual('13');
            });
        });

        describe('"getFormattedMonth" method', () => {
            test('it should be defined', () => {
                expect(typeof getFormattedMonth).toBe('function');
            });

            test('it should return correct result', () => {
                const date = new Date('Wed Dec 13 2017 09:06:02 GMT+0400 (+04)');
                const format = 'mm';

                const formattedMonth = getFormattedMonth(date, format);

                expect(formattedMonth).toEqual('12');
            });
        });

        describe('"getFormattedYear" method', () => {
            test('it should be defined', () => {
                expect(typeof getFormattedYear).toBe('function');
            });

            test('it should return correct result', () => {
                const date = new Date('Wed Dec 13 2017 09:06:02 GMT+0400 (+04)');
                const format = 'yyyy';

                const formattedYear = getFormattedYear(date, format);

                expect(formattedYear).toEqual('2017');
            });
        });
    });
});
