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
function createCard (cardData, deleteCard, template, likeHandler, cardOpeningModal, setModalListeners) {
  const cardItem = template.content.cloneNode(true);

  // Настройка фотографии карточки
  const cardImage = cardItem.querySelector('.card__image'); // Также данная фотография является и кнопкой открытия модального окна открытой карточки
  cardImage.src = cardData.link;
  cardImage.alt = `На фото изображено место "${cardData.name}"`;

  // Настройка заголовка карточки
  const cardTitle = cardItem.querySelector('.card__title');
  cardTitle.textContent = cardData.name;

  // Настройка кнопки лайка карточки
  const likeButton = cardItem.querySelector('.card__like-button');
  likeButton.setAttribute('aria-label', 'Поставить лайк');
  likeButton.addEventListener('click', likeHandler);

  // Настройка кнопки удаления карточки
  const deletButton = cardItem.querySelector('.card__delete-button');
  deletButton.setAttribute('aria-label', 'Удалить место');
  deletButton.addEventListener('click', deleteCard);
  
  // Настройка модального окна открытой карточки
  const cardOpeningModalImage = cardOpeningModal.querySelector('.popup__image'); // Настройка изображения модального окна открытой карточки
  cardOpeningModalImage.src = cardImage.src;
  cardOpeningModalImage.alt = cardImage.alt;
  cardOpeningModal.querySelector('.popup__caption').textContent = cardTitle.textContent; // Настройка подписи модального окна открытой карточки

  setModalListeners(cardOpeningModal, cardImage);

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