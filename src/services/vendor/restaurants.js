import axios from '../../util/Vendor';

export const restaurantAllList = async () => {
	return await axios.get('restaurant').then(async (result) => await result).catch(err => err);
}

export const restaurantList = async (data) => {
	return await axios.post('restaurant/restaurant-list', data).then(async (result) => await result).catch(err => err);
}

export const restaurantRegister = async (data) => {
    return await axios.post('restaurant', data).then(async (result) => await result).catch(err => err);
}

export const restaurantShow = async (id) => {
    return await axios.get(`restaurant/${id}`).then(async (result) => await result).catch(err => err);
}

export const restaurantUpdate = async (id,data) => {
    return await axios.put(`restaurant/${id}`, data).then(async (result) => await result).catch(err => err);
}

export const restaurantDelete = async (id) => {
    return await axios.delete(`restaurant/${id}`).then(async (result) => await result).catch(err => err);
}