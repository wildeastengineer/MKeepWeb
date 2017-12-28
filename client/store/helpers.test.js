import {
    mapArrayToObject,
    mapObjectToArray
} from './helpers';

describe('helpers', () => {
    describe('"mapArrayToObject" method', () => {
        test('it should be defined', () => {
            expect(typeof mapArrayToObject).toBe('function');
        });

        test('it should return correct result for default key', () => {
            const array = [
                {
                    _id: '1',
                    value: 'value_1'
                },
                {
                    _id: '2',
                    value: 'value_2'
                },
                {
                    _id: '3',
                    value: 'value_3'
                }
            ];

            const result = mapArrayToObject(array);

            expect(result).toEqual({
                '1': {
                    _id: '1',
                    value: 'value_1'
                },
                '2': {
                    _id: '2',
                    value: 'value_2'
                },
                '3': {
                    _id: '3',
                    value: 'value_3'
                }
            });
        });

        test('it should not mutate original state', () => {
            const array = [
                {
                    _id: '1',
                    value: 'value_1'
                },
                {
                    _id: '2',
                    value: 'value_2'
                },
                {
                    _id: '3',
                    value: 'value_3'
                }
            ];

            mapArrayToObject(array);

            expect(array).toEqual([
                {
                    _id: '1',
                    value: 'value_1'
                },
                {
                    _id: '2',
                    value: 'value_2'
                },
                {
                    _id: '3',
                    value: 'value_3'
                }
            ]);
        });
    });
    describe('"mapArrayToObject" method', () => {
        test('it should be defined', () => {
            expect(typeof mapObjectToArray).toBe('function');
        });

        test('it should return correct result', () => {
            const object = {
                '1': {
                    _id: '1',
                    value: 'value_1'
                },
                '2': {
                    _id: '2',
                    value: 'value_2'
                },
                '3': {
                    _id: '3',
                    value: 'value_3'
                }
            };

            const result = mapObjectToArray(object);

            expect(result).toEqual([
                {
                    _id: '1',
                    value: 'value_1'
                },
                {
                    _id: '2',
                    value: 'value_2'
                },
                {
                    _id: '3',
                    value: 'value_3'
                }
            ]);
        });

        test('it should not mutate original state', () => {
            const object = {
                '1': {
                    _id: '1',
                    value: 'value_1'
                },
                '2': {
                    _id: '2',
                    value: 'value_2'
                },
                '3': {
                    _id: '3',
                    value: 'value_3'
                }
            };

            mapObjectToArray(object);

            expect(object).toEqual({
                '1': {
                    _id: '1',
                    value: 'value_1'
                },
                '2': {
                    _id: '2',
                    value: 'value_2'
                },
                '3': {
                    _id: '3',
                    value: 'value_3'
                }
            });
        });
    });
});