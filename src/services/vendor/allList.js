import axios from '../../util/Vendor';

export const menuGroupList = async (id) => {
	return await axios.get(`menu-group?id=${id}`).then(async (result) => await result).catch(err => err);
}

export const quantityGroupList = async (id) => {
	return await axios.get(`menu-quantity-group?id=${id}`).then(async (result) => await result).catch(err => err);
}

export const toppingsGroupList = async (id) => {
	return await axios.get(`menu-topping-group?id=${id}`).then(async (result) => await result).catch(err => err);
}

export const extraItemList = async (id) => {
	return await axios.get(`menu-topping-extra-item?id=${id}`).then(async (result) => await result).catch(err => err);
}

export const menuItemList = async (id) => {
	return await axios.get(`menu-group?id=${id}`).then(async (result) => await result).catch(err => err);
}



export const menuGroupDelete = async (id) => {
    return await axios.delete(`menu-group/${id}`).then(async (result) => await result).catch(err => err);
}

export const quantityGroupDelete = async (id) => {
    return await axios.delete(`menu-quantity-group/${id}`).then(async (result) => await result).catch(err => err);
}

export const toppingsGroupDelete = async (id) => {
    return await axios.delete(`menu-topping-group/${id}`).then(async (result) => await result).catch(err => err);
}

export const extraItemDelete = async (id) => {
    return await axios.delete(`menu-topping-extra-item/${id}`).then(async (result) => await result).catch(err => err);
}

export const menuItemDelete = async (id) => {
    return await axios.delete(`menu-group/${id}`).then(async (result) => await result).catch(err => err);
}