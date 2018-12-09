// import config from 'config';
import { authHeader } from '../_helpers/auth-header';
import { userService } from './user.service';

export const productService = {
    // create,
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

// function register(user) {
//     const requestOptions = {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(user)
//     };

//     // return fetch(`${config.apiUrl}/users/register`, requestOptions).then(handleResponse);
//     return fetch(`http://localhost:4000/users/register`, requestOptions).then(handleResponse);
// }

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
    };

    // return fetch(`${config.apiUrl}/users`, requestOptions).then(handleResponse);
    return fetch(`http://localhost:8080/api/v1/admin/products`, requestOptions).then(handleResponse);
}


function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
    };

    // return fetch(`${config.apiUrl}/users/${id}`, requestOptions).then(handleResponse);
    return fetch(`http://localhost:8080/api/v1/products/${id}`, requestOptions).then(handleResponse);
}

function create(product) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(product)
    };

    return fetch('http://localhost:8080/api/v1/admin/product', requestOptions).then(handleResponse);
}

function update(user) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    // return fetch(`${config.apiUrl}/users/${user.id}`, requestOptions).then(handleResponse);
    return fetch(`http://localhost:8080/api/v1/products/${user.id}`, requestOptions).then(handleResponse);
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
    };

    // return fetch(`${config.apiUrl}/users/${id}`, requestOptions).then(handleResponse);
    return fetch(`http://localhost:8080/api/v1/products/${id}`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                if (!response.url.includes("signin")) {
                    userService.logout();
                    location.reload(true);
                }
            }
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        return data;
    });
}