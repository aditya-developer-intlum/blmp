import axios from '../util/Api'

export const category = async () => {

	return await axios.get(`category-all`).then(async (result) => await result)
	.catch(err => err);
}
export const vendor = async () => {

	return await axios.get('vendors-all').then(async (result) => await result)
	.catch(err => err);
}

export const productAttribute = async () => {

	return await axios.get(`product-attribute-all`).then(async (result) => await result)
	.catch(err => err);
}
