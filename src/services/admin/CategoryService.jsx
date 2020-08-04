import axios from '../../util/Admin'

export const all = async (selectedPageSize,currentPage,search)=> {

	return await axios.get(`category?pageSize=${selectedPageSize}&currentPage=${currentPage}&search=${search}`).then(async (result) => await result)
	.catch(err => err);
}
export const insert = async (data)=> {

	return await axios.post('category',data).then(async (result) => await result)
	.catch(err => err);
}

export const update = async (data,id)=> {

	return await axios.put(`category/${id}`,data).then(async (result) => await result)
	.catch(err => err);
}

export const destroy = async (id)=> {

	return await axios.delete(`category/${id}`).then(async (result) => await result)
	.catch(err => err);
}