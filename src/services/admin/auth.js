import * as methodes from '../MethodService';
import axios from '../../util/Api';
/**
 * Login route
 * @param {*} data 
 */
export const login = (data) => {
    return methodes.PostRequest('login', data);
}
export const staffLogin = (data) => {
    return methodes.PostRequest('staff-login', data);
}
/**
 * Register route
 * @param {*} data 
 */
export const register = (data) => {
    return methodes.PostRequest('register', data);
}

export const logout = async (data) => {
    return await axios.post('/api/v1/logout', data).then(async (result) => await result).catch(err => err);
}