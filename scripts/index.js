// @todo: Темплейт карточки
const template = document.querySelector('#card-template');

// @todo: DOM узлы
const cardList = document.querySelector('.places__list');

// @todo: Функция создания карточки
function addCards (initialCard) {
    const cardItem = template.content.cloneNode(true);
    cardItem.querySelector('.card__image').setAttribute('src', initialCard.link);
    cardItem.querySelector('.card__title').textContent = initialCard.name;
    cardItem.querySelector('.card__delete-button').addEventListener('click', deleteCard);
    cardList.append(cardItem);
}

// @todo: Функция удаления карточки
function deleteCard(evt) {
    const eventTarget = evt.target;
    const cardItem = eventTarget.closest('.places__item');
    cardItem.remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach(element => {
    addCards(element);
})