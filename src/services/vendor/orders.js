import axios from '../../util/Vendor';

export const all = async (id) => {
	return await axios.get(`orders?id=${id}`).then(async (result) => await result).catch(err => err);
}

export const allOrders = async (id) => {
	return await axios.get(`all-orders?id=${id}`).then(async (result) => await result).catch(err => err);
}

export const allAwaiting = async (id) => {
	return await axios.get(`awaiting-orders?id=${id}`).then(async (result) => await result).catch(err => err);
}

export const allConfirmed = async (id) => {
	return await axios.get(`confirmed-orders?id=${id}`).then(async (result) => await result).catch(err => err);
}

export const create = async (data) => {
    return await axios.post('orders', data).then(async (result) => await result).catch(err => err);
}

export const show = async (id) => {
    return await axios.get(`orders/${id}`).then(async (result) => await result).catch(err => err);
}

export const update = async (id,data) => {
    return await axios.put(`orders/${id}`, data).then(async (result) => await result).catch(err => err);
}

export const changeStatus = async (id,data) => {
    return await axios.put(`change-status/${id}`, data).then(async (result) => await result).catch(err => err);
}

export const changeCurrentStatus = async (id,data) => {
    return await axios.put(`change-current-status/${id}`, data).then(async (result) => await result).catch(err => err);
}

export const destroy = async (id) => {
    return await axios.delete(`orders/${id}`).then(async (result) => await result).catch(err => err);
}