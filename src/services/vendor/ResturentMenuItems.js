import axios from '../../util/Vendor'

export const all = async (id) => {
    return await axios.get(`menu-item?id=${id}`).then((result) => result)
        .catch(err => err);
}
export const getDataById = async (id) => {
    return await axios.get(`menu-item/${id}`).then((result) => result)
        .catch(err => err);
}
export const insert = async (data) => {
    return await axios.post('menu-item', data).then((result) => result)
        .catch(err => err);
}

export const update = async (data, id) => {
    return await axios.put(`menu-item/${id}`, data).then((result) => result)
        .catch(err => err);
}

export const destroy = async (id) => {
    return await axios.delete(`menu-item/${id}`).then((result) => result)
        .catch(err => err);
}