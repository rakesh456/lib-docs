
export const INPUT_TYPE = ["number", "text", "radio", "checkbox"]

// Function to check obj is undefined or null
export function isUndefinedOrNull(obj) {
    return (typeof obj === "undefined" || obj === null || !obj) ? true : false;
}

export function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}

export function isObject(obj) {
    return typeof obj === 'object';
}

export function isString(variable) {
    return typeof variable === 'string';
}

export function isNumber(variable) {
    return typeof variable === 'number';
}

export function isBoolean(variable) {
    return typeof variable === "boolean";
}

export function isValidUIElement(htmlElement) {
    return (htmlElement.elementType === 'input' && INPUT_TYPE.indexOf(htmlElement.type) !== -1);
}

export const isHTML = (str) => {
    return /<([A-Za-z][A-Za-z0-9]*)\b[^>]*>(.*?)<\/\1>/.test(str);
}

// Create our number formatter.
export const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

// import moment from 'moment';
export function getDateMMDDYYYY(date) {
    let d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [month, day, year].join('/');
}

export function getDateByFormatDDMMYYYY(date, format) {
    return (format && format === 'MM/DD/YYYY') ? getDateMMDDYYYY(date) : getDateMMDDYYYY(date);
}

export function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

export const locales = [
    {
        language: 'en-US',
        locale: 'en'
    },
    {
        language: 'es-ES',
        locale: 'es'
    }
]