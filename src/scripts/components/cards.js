const initialCards = [
    {
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
      name: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
      name: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    }
];

// Функция создания карточки
function createCard (cardData, deleteCard, template, likeHandler, handleClickImage) {

  // Переменные
  const cardItem = template.content.cloneNode(true); // Объект карточки
  const cardImage = cardItem.querySelector('.card__image'); // Изображение карточки (также кнопка открытия модального окна)
  const cardTitle = cardItem.querySelector('.card__title'); // Заголовок карточки
  const likeButton = cardItem.querySelector('.card__like-button'); // Кнопка лайка
  const deletButton = cardItem.querySelector('.card__delete-button'); // Кнопка удаления карточки

  // Настройка фотографии карточки
  cardImage.src = cardData.link;
  cardImage.alt = `На фото изображено место "${cardData.name}"`;

  // Настройка заголовка карточки
  cardTitle.textContent = cardData.name;

  // Настройка кнопки лайка карточки
  likeButton.setAttribute('aria-label', 'Поставить лайк');
  likeButton.addEventListener('click', likeHandler);

  // Настройка кнопки удаления карточки
  deletButton.setAttribute('aria-label', 'Удалить место');
  deletButton.addEventListener('click', deleteCard);

  // Установка слушателя на кнопку открытия модального окна
  cardImage.addEventListener('click', handleClickImage);
  
  return cardItem;
}

// Функция удаления карточки
function deleteCard(evt) {
  const eventTarget = evt.target;
  const cardItem = eventTarget.closest('.places__item');
  cardItem.remove();
}

// Функция добавления лайка
function likeHandler(evt) {
  const eventTarget = evt.target;
  eventTarget.classList.toggle('card__like-button_is-active');
}

export {initialCards, createCard, deleteCard, likeHandler};