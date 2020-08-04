import * as methodes from '../MethodService';

/**
 * Login route
 * @param {*} data 
 */
export const login = (data) => {
    return methodes.PostRequest('login', data);
}

/**
 * Register route
 * @param {*} data 
 */
export const register = (data) => {
    return methodes.PostRequest('registration/vendor', data);
}