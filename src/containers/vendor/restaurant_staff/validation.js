export const password = (value) => {
    let error;
    if (!value) {
        error = 'Please enter your Password';
    } else if (value.length < 6) {
        error = 'Value must be at least 6 characters long';
    }
    return error;
};

export const email = (value) => {
    let error;
    if (!value) {
        error = 'Please enter your Email';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
        error = 'Invalid Email Address';
    }
    return error;
};

/**
 * 
 * @param {* main value} value 
 * @param {* name of the field} fieldName 
 * @param {* min length} minLen 
 * @param {* max length} maxLen 
 */
export const text = (value, fieldName, minLen, maxLen) => {
    let error;

    if (!value) {
        error = 'Please enter your ' + fieldName;
    }
    else if (!/^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$/i.test(value)) {
        error = 'Special cheracter is not allowed';
    }
    else if (minLen && minLen > value.length) {
        error = fieldName + ' should be at least ' + minLen + ' charactres.';
    }
    else if (maxLen && maxLen <= value.length) {
        error = fieldName + ' should be in ' + maxLen + ' charactres.';
    }
    return error;
};

export const sptext = (value, fieldName, minLen, maxLen) => {
    let error;

    if (!value) {
        error = 'Please enter your ' + fieldName;
    }
    else if (minLen && minLen > value.length) {
        error = fieldName + ' should be at least ' + minLen + ' charactres.';
    }
    else if (maxLen && maxLen <= value.length) {
        error = fieldName + ' should be in ' + maxLen + ' charactres.';
    }
    return error;
};

export const number = (value, fieldName, minLen, maxLen) => {
    let error;

    if (!value) {
        error = 'Please enter your ' + fieldName;
    }
    else if (!/^\d+$/i.test(value)) {
        error = 'Only numeric values allowed.';
    }
    else if (minLen && minLen > value.length) {
        error = fieldName + ' should be at least ' + minLen + ' charactres.';
    }
    else if (maxLen && maxLen <= value.length) {
        error = fieldName + ' should be in ' + maxLen + ' charactres.';
    }
    return error;
};

export const notnull = (value, fieldName) => {
    let error;

    if (!value) {
        error = 'Please enter your ' + fieldName;
    }
    return error;
};