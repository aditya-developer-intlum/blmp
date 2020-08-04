const api_url = 'http://127.0.0.1:3333/api/v1/';

const Header = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`,
    'refreshToken': localStorage.getItem('refresh_token')
};

export const postRequest = async (path, data) => {
    const requestOptions = {
        method: 'POST',
        headers: Header,
        body: JSON.stringify(data)
    };
    const response = await fetch(api_url + path, requestOptions);
    return await response;
};

export const postRequestWOJWT = async (path, data) => {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify(data)
    };
    const response = await fetch(api_url + path, requestOptions);
    return await response;
};

export const getRequest = async (path) => {
    const requestOptions = {
        method: 'GET',
        headers: Header,
    };
    const response = await fetch(api_url + path, requestOptions);
    return await response.json();
};

export const putRequest = async (path, data) => {
    const requestOptions = {
        method: 'PUT',
        headers: Header,
        body: JSON.stringify(data)
    };
    const response = await fetch(api_url + path, requestOptions);
    return await response.json();
};

export const deleteRequest = async (path, data) => {
    const requestOptions = {
        method: 'DELETE',
        headers: Header,
        body: JSON.stringify(data)
    };
    const response = await fetch(api_url + path, requestOptions);
    return await response.json();
};