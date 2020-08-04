import * as methodes from '../MethodService';
import axios from '../../util/Admin';
/**
 * Vendor List
 * @param {*} data 
 */
// export const vendorList = (data) => {
//     return methodes.AuthPostRequest('admin/user/vendor-list', data);
// }
export const vendorList = async (data) => {
	return await axios.post('user/vendor-list', data).then(async (result) => await result).catch(err => err);
}

export const vendorRegister = async (data) => {
    return await axios.post('user', data).then(async (result) => await result).catch(err => err);
}

export const vendorShow = async (id) => {
    return await axios.get(`user/${id}`).then(async (result) => await result).catch(err => err);
}

export const vendorUpdate = async (id,data) => {
    return await axios.put(`user/${id}`, data).then(async (result) => await result).catch(err => err);
}

export const vendorDelete = async (id) => {
    return await axios.delete(`user/${id}`).then(async (result) => await result).catch(err => err);
}