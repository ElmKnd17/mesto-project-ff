import { deleteLikeData, putLikeData } from "./api";

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

let cards = [];

function setCards (array) {
  cards = array;
}

// Функция создания карточки
function createCard (cardData, template, likeHandler, handleClickImage, deleteHandler, userId, putLikeData, deleteLikeData) {

  // Переменные
  const cardItem = template.content.cloneNode(true); // Объект карточки
  const card = cardItem.querySelector('.card');
  const cardImage = cardItem.querySelector('.card__image'); // Изображение карточки (также кнопка открытия модального окна)
  const cardTitle = cardItem.querySelector('.card__title'); // Заголовок карточки
  const likeButton = cardItem.querySelector('.card__like-button'); // Кнопка лайка
  const deletButton = cardItem.querySelector('.card__delete-button'); // Кнопка удаления карточки
  const likeCounter = cardItem.querySelector('.card__like-counter') // Счётчик лайков
  let numbersOfLikes = 0; // Число лайков
  let isLiked = false;
  if (cardData.likes) {
    numbersOfLikes = cardData.likes.length;
    Array.from(cardData.likes).forEach(like => {
      isLiked = (like._id === userId) ? true : false;
    })
  }

  if(isLiked) {
    likeButton.classList.add('card__like-button_is-active');
  }
  
  if(cardData._id) {
    card.setAttribute('id', cardData._id);
  }

  // Настройка фотографии карточки
  cardImage.src = cardData.link;
  cardImage.alt = `На фото изображено место "${cardData.name}"`;

  // Настройка заголовка карточки
  cardTitle.textContent = cardData.name;

  // Настройка количества лайков карточки
  likeCounter.textContent = numbersOfLikes;

  // Настройка кнопки лайка карточки
  likeButton.setAttribute('aria-label', 'Поставить лайк');
  likeButton.addEventListener('click', (evt) => {
    likeHandler(evt, cardData, putLikeData, deleteLikeData);
  });
  // Настройка кнопки удаления карточки

  if(!(cardData.owner && (cardData.owner._id === userId))) {
    deletButton.remove();
  } else {
    deletButton.setAttribute('aria-label', 'Удалить место');
    // deletButton.addEventListener('click', deleteCard);
    deletButton.addEventListener('click', deleteHandler);
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
function likeHandler(evt, cardData) {
  const eventTarget = evt.target;
  const likeCounter = eventTarget.closest('.card__like-container').querySelector('.card__like-counter');
  if(!eventTarget.classList.contains('card__like-button_is-active')){
    likeCounter.textContent = Number.parseInt(likeCounter.textContent) + 1;
    putLikeData(cardData._id);
  } else {
    likeCounter.textContent = Number.parseInt(likeCounter.textContent) - 1;
    deleteLikeData(cardData._id);
  }
  eventTarget.classList.toggle('card__like-button_is-active');
}

export {cards, createCard, deleteCard, likeHandler, setCards, initialCards};