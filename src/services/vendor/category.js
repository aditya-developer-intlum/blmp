import * as methodes from '../MethodService';

/**
 * Login route
 * @param {*} data 
 */
export const login = (data) => {
    return methodes.PostRequest('login', data);
}
