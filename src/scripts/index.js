///////////////////////////////////// Импорты /////////////////////////////////////
// Импорт стилей
import '../pages/index.css';
// Импорт из cards.js
import { cards, createCard, likeHandler, setCards, initialCards} from './components/cards.js';
// Импорт из modal.js
import { openModal, closeModal } from './components/modal.js';
// Импопрт из validation.js
import { enableValidation, clearValidation } from './components/validation.js';
// Импорт из api.js
import { getUserData, getCardsData, patchUserData, postCardsData, deleteCardsData, patchUserAvatar, putLikeData, deleteLikeData } from './components/api.js';

///////////////////////////////////// Переменные /////////////////////////////////////
    ///////////////// Профиль /////////////////
const openProfileModalButton = document.querySelector('.profile__edit-button'); // Кнопка редактирвоания профиля
const profileModal = document.querySelector('.popup_type_edit'); // Модальное окно редактирования профиля
const closeProfileModalButton = profileModal.querySelector('.popup__close'); // Кнопка закрытия модального окна редактироваия профиля
const profileFormElement = profileModal.querySelector('.popup__form'); // Форма модального окна редактироваия профиля
// Выбор изменяемых формой элементов
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image');
// Выбор полей формы
const profileNameInput = profileFormElement.querySelector('.popup__input_type_name');
const profileJobInput = profileFormElement.querySelector('.popup__input_type_description');
// Модальное окно обновления аватара
const avatarModal = document.querySelector('.popup_type_edit-avatar');
const closeAvatarModal = avatarModal.querySelector('.popup__close');
const avatarFormElement = avatarModal.querySelector('.popup__form');
const avatarInput = avatarFormElement.querySelector('.popup__input');

    ///////////////// Карточки /////////////////
const openCardAdditionModalButton = document.querySelector('.profile__add-button'); // Кнопка добавления карточки
const cardAdditionModal = document.querySelector('.popup_type_new-card'); // Модальное окно добавления карточки
const closeCardAdditionalModalButton = cardAdditionModal.querySelector('.popup__close'); // Кнопка закрытия модального окна добавления карточки
const cardFormElement = cardAdditionModal.querySelector('.popup__form'); // Форма модального окна добавления карточки
const cardOpeningModal = document.querySelector('.popup_type_image'); // Модальное окно открытой карточки
const cardList = document.querySelector('.places__list'); // Список карточек
const cardTemplate = document.querySelector('#card-template'); // Темплейт карточки
// Элементы модального окна
const cardOpeningModalImage = cardOpeningModal.querySelector('.popup__image'); // Изображение модального окна
const cardOpeningModalCaption = cardOpeningModal.querySelector('.popup__caption'); // Описание модального окна
const closeCardOpenModalButton = cardOpeningModal.querySelector('.popup__close'); // Кнопка закрытия модального окна
// Выбор полей формы
const cardNameInput = cardFormElement.querySelector('.popup__input_type_card-name');
const cardUrlInput = cardFormElement.querySelector('.popup__input_type_url');
// Модальное окно удаления карточки
const cardDeletingModal = document.querySelector('.popup_type_delete-card');
const closeCardDeletingModal = cardDeletingModal.querySelector('.popup__close');
const cardDeletingFormElement = cardDeletingModal.querySelector('.popup__form');

    ///////////////// Валидация /////////////////
const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
}

///////////////////////////////////// ВАЛИДАЦИЯ /////////////////////////////////////
enableValidation(validationConfig);

///////////////////////////////////// Профиль /////////////////////////////////////
let userId;
    ///////////////// Получение данных пользователя /////////////////
    getUserData().then(userData => {
        userId = userData._id;
        profileTitle.textContent = userData.name;
        profileDescription.textContent = userData.about;
        profileImage.style.backgroundImage = `url(${userData.avatar})`;
    })
    .catch(error => {
        console.log(error);
    });

///////////////////////////////////// МОДАЛЬНЫЕ ОКНА /////////////////////////////////////
    ///////////////// Модальное окно редактирования профиля /////////////////
// Слушатель кнопки открытия модального окна
openProfileModalButton.addEventListener('click', () => {
    openModal(profileModal, closeProfileModalButton);
    profileNameInput.value = profileTitle.textContent;
    profileJobInput.value = profileDescription.textContent;
    clearValidation(profileFormElement, validationConfig);
})
    ///////////////// Модальное окно редактирования карточки /////////////////
// Обработчик слушателя кнопки открытия модального окна карточки
function handleClickImage(evt){
    // Нажатая карточка
    const targetCard = evt.target.closest('.card');
    // Заголовок нажатой карточки
    const targetCardTitle = targetCard.querySelector('.card__title');
    // Настройка изображения модального окна открытой карточки
    cardOpeningModalImage.src = evt.target.src;
    cardOpeningModalImage.alt = evt.target.alt;
    // Настройка подписи модального окна открытой карточки
    cardOpeningModalCaption.textContent = targetCardTitle.textContent;
    // Открытие модального окна
    openModal(cardOpeningModal, closeCardOpenModalButton);
}
// Слушатель кнопки открытия модального окна
openCardAdditionModalButton.addEventListener('click', () => {
    openModal(cardAdditionModal, closeCardAdditionalModalButton);
    cardFormElement.reset();
    clearValidation(cardFormElement, validationConfig);
})

///////////////////////////////////// КАРТОЧКИ /////////////////////////////////////
// Вывод карточек на страницу
getCardsData().then(cardsData => {
    setCards(Array.from(cardsData));
    cards.forEach(element => {
        cardList.append(createCard(element, cardTemplate, likeHandler, handleClickImage, deleteHandler, userId, putLikeData, deleteLikeData));
    });
})
.catch((error)=> {
    console.log(error);
    initialCards.forEach(element => {
        cardList.append(createCard(element, cardTemplate, likeHandler, handleClickImage, deleteHandler, userId, putLikeData, deleteLikeData));
    });
});

///////////////////////////////////// ФОРМЫ /////////////////////////////////////
    ///////////////// Форма профиля /////////////////
// Обработчик «отправки» формы
function handleEditProfileFormSubmit(evt) {
    evt.preventDefault();
    ///////////////// Обновление даных пользователя /////////////////
    const button = evt.target.querySelector('.button');
    button.textContent = 'Сохранение...';
    patchUserData(profileNameInput.value, profileJobInput.value).then(userData => {
        // Установка соответствующих значений
        profileTitle.textContent = userData.name;
        profileDescription.textContent = userData.about;
        closeModal(profileModal, closeProfileModalButton);
        button.textContent = 'Сохранить';
    })
    .catch(error => {
        console.log(error);
    });
}
// Слушатель отправки формы
profileFormElement.addEventListener('submit', handleEditProfileFormSubmit);

    ///////////////// Форма карточки /////////////////
// Обработчик «отправки» формы
function handleAddCardFormSubmit(evt) {
    evt.preventDefault();
    ///////////////// Обновление даных пользователя /////////////////
    const button = evt.target.querySelector('.button');
    button.textContent = 'Сохранение...';
    postCardsData(cardNameInput.value, cardUrlInput.value).then(cardData => {
        const cardName = cardData.name;
        const cardUrl = cardData.link;
        const cardOwnerId = cardData.owner._id;
        const cardId = cardData._id;
        cardList.prepend(createCard({name: cardName, link: cardUrl, _id: cardId, owner: { _id: cardOwnerId }}, cardTemplate, likeHandler, handleClickImage, deleteHandler, userId, putLikeData, deleteLikeData));
        closeModal(cardAdditionModal, closeCardAdditionalModalButton);
        button.textContent = 'Сохранить';
    })
    .catch(error => {
        console.log(error);
    });
}
// Слушатель отправки формы
cardFormElement.addEventListener('submit', handleAddCardFormSubmit);

function handleDeleteCardSubmit(evt) {
    evt.preventDefault();
    const button = evt.target.querySelector('.button');
    button.textContent = 'Удаление...';
    deleteCardsData(cardDeletingModal.id).then(() => {
        const card = document.getElementById(cardDeletingModal.id);
        card.remove();
        cardDeletingModal.removeAttribute('id');
        button.textContent = 'Да';
        closeModal(cardDeletingModal, closeCardDeletingModal);
    })
    .catch(error => {
        console.log(error);
    });
}

cardDeletingFormElement.addEventListener('submit', handleDeleteCardSubmit)

function deleteHandler(evt) {
    cardDeletingModal.setAttribute('id', evt.target.closest('.card').id);
    openModal(cardDeletingModal, closeCardDeletingModal);
}

profileImage.addEventListener('click', () => {
    openModal(avatarModal, closeAvatarModal);
    clearValidation(avatarFormElement, validationConfig);
})

avatarFormElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const button = evt.target.querySelector('.button');
    button.textContent = 'Сохранение...';
    patchUserAvatar(avatarInput.value).then(userData => {
        console.log(userData.avatar);
        profileImage.style.backgroundImage = `url(${userData.avatar})`;
        closeModal(avatarModal, closeAvatarModal);
        button.textContent = 'Сохранить';
    });
})