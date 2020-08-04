import axios from '../../util/Admin'

export const all = async () => {

    return await axios.get(`product`).then(async (result) => await result)
        .catch(err => err);
}
export const getDataById = async (id) => {

    return await axios.get(`product/${id}`).then(async (result) => await result)
        .catch(err => err);
}
export const insert = async (data) => {

    return await axios.post('product', data).then(async (result) => await result)
        .catch(err => err);
}

export const update = async (data, id) => {

    return await axios.put(`product/${id}`, data).then(async (result) => await result)
        .catch(err => err);
}

export const destroy = async (id) => {

    return await axios.delete(`product/${id}`).then(async (result) => await result)
        .catch(err => err);
}