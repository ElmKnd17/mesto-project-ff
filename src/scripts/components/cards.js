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
function createCard (cardData, deleteCard, template, likeHandler, cardOpeningModal, openModal, closeModal) {
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

  // Обработчик слушателя кнопки открытия модального окна карточки
  function handleClickImage(){
    // Настройка изображения модального окна открытой карточки
    const cardOpeningModalImage = cardOpeningModal.querySelector('.popup__image');
    cardOpeningModalImage.src = cardImage.src;
    cardOpeningModalImage.alt = cardImage.alt;

    // Настройка подписи модального окна открытой карточки
    cardOpeningModal.querySelector('.popup__caption').textContent = cardTitle.textContent;

    // Открытие модального окна
    openModal(cardOpeningModal);

    // Установка слушателей на способы закрытия модального окна (по кнопке и по нажатию вне окна)
    const closeCardOpenModalButton = cardOpeningModal.querySelector('.popup__close');
    closeCardOpenModalButton.addEventListener('click', () => {
      closeModal(cardOpeningModal);
    })
    cardOpeningModal.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup')){
          closeModal(evt.target);
      }
    })
  }
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