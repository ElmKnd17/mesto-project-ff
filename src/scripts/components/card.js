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
  const isLiked = cardData.likes.some(like => {
    return (like._id === userId) ? true : false;
  })

  if(isLiked) {
    likeButton.classList.add('card__like-button_is-active');
  }
  
  card.setAttribute('id', cardData._id);

  // Настройка фотографии карточки
  cardImage.src = cardData.link;
  cardImage.alt = `На фото изображено место "${cardData.name}"`;

  // Настройка заголовка карточки
  cardTitle.textContent = cardData.name;

  // Настройка количества лайков карточки
  likeCounter.textContent = cardData.likes.length;

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
function likeHandler(evt, cardData, putLikeData, deleteLikeData) {
  const eventTarget = evt.target;
  const likeCounter = eventTarget.closest('.card__like-container').querySelector('.card__like-counter');
  const likeMethod = eventTarget.classList.contains('card__like-button_is-active')
    ? deleteLikeData
    : putLikeData;
  likeMethod(cardData._id)
    .then(res => {
      likeCounter.textContent = res.likes.length;
      eventTarget.classList.toggle('card__like-button_is-active');
    })
    .catch(error => {
      console.log(error);
    })
}

export {createCard, deleteCard, likeHandler};