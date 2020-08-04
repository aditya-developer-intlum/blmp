import * as methodes from '../MethodService';
/**
 * Vendor List
 * @param {*} data 
 */
export const vendorList = () => {
    return methodes.GetRequest('vendor-list');
}
export const restaurantList = (id) => {
    return methodes.GetRequest(`restaurant-list?vendor=${id}`);
}
