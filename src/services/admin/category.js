import * as methodes from '../MethodService';

/**
 * Login route
 * @param {*} data 
 */
export const all = () => {
    return methodes.AuthGetRequest('product-vendor');
}

export const getDataById = (id) => {
    return methodes.AuthGetRequest(`product-vendor/${id}`);
}

export const update = (data, id) => {
    return methodes.AuthPutRequest(`product-vendor/${id}`, data);
}

export const destroy = (id) => {
    return methodes.AuthDeleteRequest(`product-vendor/${id}`);
}

