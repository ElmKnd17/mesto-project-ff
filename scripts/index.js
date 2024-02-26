// @todo: Темплейт карточки
const template = document.querySelector('#card-template');

// @todo: DOM узлы
const cardList = document.querySelector('.places__list');

// @todo: Функция создания карточки
function createCard (cardData, deleteCard) {
    const cardItem = template.content.cloneNode(true);
    cardItem.querySelector('.card__image').src = cardData.link;
    cardItem.querySelector('.card__image').alt = `На фото изображено место "${cardData.name}"`;
    cardItem.querySelector('.card__title').textContent = cardData.name;
    cardItem.querySelector('.card__like-button').setAttribute('aria-label', 'Поставить лайк');
    cardItem.querySelector('.card__delete-button').setAttribute('aria-label', 'Удалить место');
    cardItem.querySelector('.card__delete-button').addEventListener('click', deleteCard);
    return cardItem;
}

// @todo: Функция удаления карточки
function deleteCard(evt) {
    const eventTarget = evt.target;
    const cardItem = eventTarget.closest('.places__item');
    cardItem.remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach(element => {
    cardList.append(createCard(element, deleteCard));
})