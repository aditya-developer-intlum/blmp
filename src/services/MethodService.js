const api_url = 'http://127.0.0.1:3333/api/v1/';

const Header = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
};

export const PostRequest = async (path, data) => {
    const requestOptions = {
        method: 'POST',
        headers: Header,
        body: JSON.stringify(data)
    };
    const response = await fetch(api_url + path, requestOptions);
    return await response;
};

export const GetRequest = async (path) => {
    const requestOptions = {
        method: 'GET',
        headers: Header,
    };
    const response = await fetch(api_url + path, requestOptions);
    return await response.json();
};

export const PutRequest = async (path, data) => {
    const requestOptions = {
        method: 'PUT',
        headers: Header,
        body: JSON.stringify(data)
    };
    const response = await fetch(api_url + path, requestOptions);
    return await response.json();
};

export const DeleteRequest = async (path) => {
    const requestOptions = {
        method: 'DELETE',
        headers: Header
    };
    const response = await fetch(api_url + path, requestOptions);
    return await response.json();
};
