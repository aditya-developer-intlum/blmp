import axios from '../../util/Admin'

export const all = async (selectedPageSize,currentPage,search)=> {

	return await axios.get(`customer`)
	.then(async (result) => await result)
	.catch(err => err);
}
export const update = async (data,id)=> {

	return await axios.put(`customer/${id}`,data)
	.then(async (result) => await result)
	.catch(err => err);
}

export const changePassword = async (data,id)=> {

	return await axios.put(`customer/${id}/change-password`,data)
	.then(async (result) => await result)
	.catch(err => err);
}