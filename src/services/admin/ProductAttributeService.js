import axios from '../../util/Admin'

export const all = async (selectedPageSize,currentPage,search)=> {

	return await axios.get(`product-attribute?pageSize=${selectedPageSize}&currentPage=${currentPage}&search=${search}`).then(async (result) => await result)
	.catch(err => err);
}
export const insert = async (data)=> {

	return await axios.post('product-attribute',data).then(async (result) => await result)
	.catch(err => err);
}

export const update = async (data,id)=> {

	return await axios.put(`product-attribute/${id}`,data).then(async (result) => await result)
	.catch(err => err);
}

export const destroy = async (id)=> {

	return await axios.delete(`product-attribute/${id}`).then(async (result) => await result)
	.catch(err => err);
}