fetch('https://mesto.nomoreparties.co/v1/wff-cohort-10/cards', {
    headers: {
        authorization: 'ebe2531e-a633-4ca4-9e9d-18db3ca8a83f'
    }
})
    .then(res => {
        return res.json();
    })
    .then(res => {
        console.log(res);
    });