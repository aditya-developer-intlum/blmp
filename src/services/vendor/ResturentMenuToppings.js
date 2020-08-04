import axios from '../../util/Vendor'

export const all = async (id) => {
    return await axios.get(`menu-topping-group?id=${id}`).then((result) => result)
        .catch(err => err);
}
export const getDataById = async (id) => {
    return await axios.get(`menu-topping-group/${id}`).then((result) => result)
        .catch(err => err);
}
export const insert = async (data) => {
    return await axios.post('menu-topping-group', data).then((result) => result)
        .catch(err => err);
}

export const update = async (data, id) => {
    return await axios.put(`menu-topping-group/${id}`, data).then((result) => result)
        .catch(err => err);
}

export const destroy = async (id) => {
    return await axios.delete(`menu-topping-group/${id}`).then((result) => result)
        .catch(err => err);
}