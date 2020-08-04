import axios from '../../util/Vendor'

export const all = async (id) => {
    return await axios.get(`menu-quantity-group?id=${id}`).then((result) => result)
        .catch(err => err);
}
export const getDataById = async (id) => {
    return await axios.get(`menu-quantity-group/${id}`).then((result) => result)
        .catch(err => err);
}
export const insert = async (data) => {
    return await axios.post('menu-quantity-group', data).then((result) => result)
        .catch(err => err);
}

export const update = async (data, id) => {
    return await axios.put(`menu-quantity-group/${id}`, data).then((result) => result)
        .catch(err => err);
}

export const destroy = async (id) => {
    return await axios.delete(`menu-quantity-group/${id}`).then((result) => result)
        .catch(err => err);
}