// import config from 'config';
import { authHeader } from '../_helpers/auth-header';

export const clientService = {
    getAll,
    // getById,
    create,
    // update,
    delete: _delete
};

function getAll() {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
    };

    return fetch(`http://localhost:8080/api/v1/admin/client`, requestOptions).then(handleResponse);
}


// function getById(id) {
//     const requestOptions = {
//         method: 'GET',
//         headers: { ...authHeader(), 'Content-Type': 'application/json' },
//     };

//     return fetch(`http://localhost:8080/api/v1/client/${id}`, requestOptions).then(handleResponse);
// }

function create(client) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(client)
    };

    return fetch('http://localhost:8080/api/v1/admin/client/create', requestOptions).then(handleResponse);
}

// function update(client) {
//     const requestOptions = {
//         method: 'PUT',
//         headers: { ...authHeader(), 'Content-Type': 'application/json' },
//         body: JSON.stringify(client)
//     };

//     return fetch(`http://localhost:8080/api/v1/client/${client.id}`, requestOptions).then(handleResponse);
// }

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
    };

    return fetch(`http://localhost:8080/api/v1/client/${id}`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                location.reload(true);
            }
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        return data;
    });
}
