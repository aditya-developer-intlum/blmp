import axios from '../../util/Vendor';

export const all = async () => {
	return await axios.get('restaurant-staff').then(async (result) => await result).catch(err => err);
}

// export const restaurantList = async (data) => {
// 	return await axios.post('restaurant-staff/restaurant-list', data).then(async (result) => await result).catch(err => err);
// }

export const create = async (data) => {
    return await axios.post('restaurant-staff', data).then(async (result) => await result).catch(err => err);
}

export const show = async (id) => {
    return await axios.get(`restaurant-staff/${id}`).then(async (result) => await result).catch(err => err);
}

export const update = async (id,data) => {
    return await axios.put(`restaurant-staff/${id}`, data).then(async (result) => await result).catch(err => err);
}

export const destroy = async (id) => {
    return await axios.delete(`restaurant-staff/${id}`).then(async (result) => await result).catch(err => err);
}