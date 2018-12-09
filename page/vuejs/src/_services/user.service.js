// import config from 'config';
import { authHeader } from '../_helpers/auth-header';

export const userService = {
    login,
    logout,
    // register,
    getAll,
    getById,
    update,
    delete: _delete
};

function login(email, password) {
    console.log('login@UserService')
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    };

    // return fetch(`${config.apiUrl}/users/authenticate`, requestOptions)
    return fetch(`http://localhost:8080/api/v1/admin/auth`, requestOptions)
        .then(handleResponse)
        .then(user => {
            // login successful if there's a jwt token in the response
            if (user.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
            }

            return user;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

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
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
    };

    // return fetch(`${config.apiUrl}/users`, requestOptions).then(handleResponse);
    return fetch(`http://credit9.io/v1/admin/users`, requestOptions).then(handleResponse);
}


function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
    };

    // return fetch(`${config.apiUrl}/users/${id}`, requestOptions).then(handleResponse);
    return fetch(`https://test.paybox.work/v1/users/${id}`, requestOptions).then(handleResponse);
}

function update(user) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    // return fetch(`${config.apiUrl}/users/${user.id}`, requestOptions).then(handleResponse);
    return fetch(`https://test.paybox.work/v1/users/${user.id}`, requestOptions).then(handleResponse);
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
    };

    // return fetch(`${config.apiUrl}/users/${id}`, requestOptions).then(handleResponse);
    return fetch(`https://test.paybox.work/v1/users/${id}`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                if (!response.url.includes("signin")) {
                    logout();
                    location.reload(true);
                }
            }
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        return data;
    });
}