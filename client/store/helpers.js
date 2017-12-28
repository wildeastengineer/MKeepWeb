export const mapArrayToObject = (array, key = '_id') => (
    array.reduce((object, arrayItem) => {
        object[arrayItem[key]] = arrayItem;

        return object;
    }, {})
);

export const mapObjectToArray = (object) => (
    Object.keys(object).map((key) => (object[key]))
);

export const without = (arr1, arr2, key) => (
    arr1.filter((el1) => (!arr2.find((el2) => (key ? el1[key] === el2[key] : el1 === el2))))
);

export const pick = (array, key) => (
    array.map((el) => (el[key]))
);
