import { cards } from "./cards";

const TOKEN = 'ebe2531e-a633-4ca4-9e9d-18db3ca8a83f';

const config = {
    userUrl: 'https://mesto.nomoreparties.co/v1/wff-cohort-10/users/me',
    cardsUrl: 'https://mesto.nomoreparties.co/v1/wff-cohort-10/cards',
    headersTypeGet: {
        authorization: TOKEN
    },
    headers: {
        authorization: TOKEN,
        'Content-Type': 'application/json'
    },
    patch: 'PATCH',
    post: 'POST',
    put: 'PUT',
    delete: 'DELETE'
};

const getUserData = () => {
    return fetch(config.userUrl, {
            headers: config.headersTypeGet
        })
        .then(res => {
            return res.ok ? res.json() : Promise.reject(res.status);
        })
}

const getCardsData = () => {
    return fetch(config.cardsUrl, {
        headers: config.headersTypeGet
    })
    .then(res => {
        return res.ok ? res.json() : Promise.reject(res.status);
    })
}

const patchUserData = (name, job) => {
    return fetch(config.userUrl, {
        method: config.patch,
        headers: config.headers,
        body: JSON.stringify({
            name: name,
            about: job
        })
    })
    .then(res => {
        return res.ok ? res.json() : Promise.reject(res.status);
    })
}

const postCardsData = (name, url) => {
    return fetch(config.cardsUrl, {
        method: config.post,
        headers: config.headers,
        body: JSON.stringify({
            name: name,
            link: url
        })
    })
    .then(res => {
        return res.ok ? res.json() : Promise.reject(res.status);
    })
}

const deleteCardsData = (id) => {
    return fetch(`${config.cardsUrl}/${id}`, {
        method: config.delete,
        headers: config.headersTypeGet,
    })
    .then(res => {
        return res.ok ? res.json() : Promise.reject(res.status);
    });
}

const patchUserAvatar = (url) => {
    return fetch(`${config.userUrl}/avatar`, {
        method: config.patch,
        headers: config.headers,
        body: JSON.stringify({
            avatar: url
        })
    })
    .then(res => {
        return res.ok ? res.json() : Promise.reject(res.status);
    });
}

const putLikeData = (id) => {
    return fetch(`${config.cardsUrl}/likes/${id}`, {
        method: config.put,
        headers: config.headersTypeGet
    })
    .then(res => {
        return res.ok ? res.json() : Promise.reject(res.status);
    });
}

const deleteLikeData = (id) => {
    return fetch(`${config.cardsUrl}/likes/${id}`, {
        method: config.delete,
        headers: config.headersTypeGet
    })
    .then(res => {
        return res.ok ? res.json() : Promise.reject(res.status);
    });
}

export {getUserData, getCardsData, patchUserData, postCardsData, deleteCardsData, patchUserAvatar, putLikeData, deleteLikeData};