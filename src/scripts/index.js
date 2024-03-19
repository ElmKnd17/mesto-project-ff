///////////////////////////////////// Импорты /////////////////////////////////////
// Импорт стилей
import '../pages/index.css';
// Импорт из cards.js
import { initialCards, createCard, deleteCard, likeHandler } from './components/cards.js';
// Импорт из modal.js
import { openModal, closeModal } from './components/modal.js';

///////////////////////////////////// Переменные /////////////////////////////////////
    ///////////////// Профиль /////////////////
const openProfileModalButton = document.querySelector('.profile__edit-button'); // Кнопка редактирвоания профиля
const profileModal = document.querySelector('.popup_type_edit'); // Модальное окно редактирования профиля
const closeProfileModalButton = profileModal.querySelector('.popup__close'); // Кнопка закрытия модального окна редактироваия профиля
const profileFormElement = profileModal.querySelector('.popup__form'); // Форма модального окна редактироваия профиля
// Выбор изменяемых формой элементов
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
// Выбор полей формы
const profileNameInput = profileFormElement.querySelector('.popup__input_type_name');
const profileJobInput = profileFormElement.querySelector('.popup__input_type_description');

    ///////////////// Карточки /////////////////
const openCardAdditionModalButton = document.querySelector('.profile__add-button'); // Кнопка добавления карточки
const cardAdditionModal = document.querySelector('.popup_type_new-card'); // Модальное окно добавления карточки
const closeCardAdditionalModalButton = cardAdditionModal.querySelector('.popup__close'); // Кнопка закрытия модального окна добавления карточки
const cardFormElement = cardAdditionModal.querySelector('.popup__form'); // Форма модального окна добавления карточки
const cardOpeningModal = document.querySelector('.popup_type_image'); // Модальное окно открытой карточки
const cardList = document.querySelector('.places__list'); // Список карточек
const cardTemplate = document.querySelector('#card-template'); // Темплейт карточки
// Выбор полей формы
const cardNameInput = cardFormElement.querySelector('.popup__input_type_card-name');
const cardUrlInput = cardFormElement.querySelector('.popup__input_type_url');

///////////////////////////////////// МОДАЛЬНЫЕ ОКНА /////////////////////////////////////
    ///////////////// Модальное окно редактирования профиля /////////////////
// Слушатель кнопки открытия модального окна
openProfileModalButton.addEventListener('click', () => {
    openModal(profileModal, closeProfileModalButton);
    profileNameInput.value = profileTitle.textContent;
    profileJobInput.value = profileDescription.textContent;
})
    ///////////////// Модальное окно редактирования карточки /////////////////
// Слушатель кнопки открытия модального окна
openCardAdditionModalButton.addEventListener('click', () => {
    openModal(cardAdditionModal, closeCardAdditionalModalButton);
    cardFormElement.reset();
})

///////////////////////////////////// КАРТОЧКИ /////////////////////////////////////
// Вывод карточек на страницу
initialCards.forEach(element => {
    cardList.append(createCard(element, deleteCard, cardTemplate, likeHandler, cardOpeningModal, openModal, closeModal));
})

///////////////////////////////////// ФОРМЫ /////////////////////////////////////
    ///////////////// Форма профиля /////////////////
// Обработчик «отправки» формы
function handleEditProfileFormSubmit(evt) {
    evt.preventDefault();
    // Установка соответствующих значений
    profileTitle.textContent = profileNameInput.value;
    profileDescription.textContent = profileJobInput.value;
    closeModal(profileModal, closeProfileModalButton);
}
// Слушатель отправки формы
profileFormElement.addEventListener('submit', handleEditProfileFormSubmit);

    ///////////////// Форма карточки /////////////////
// Обработчик «отправки» формы
function handleAddCardFormSubmit(evt) {
    evt.preventDefault();
    // Выбор изменяемых формой элементов
    const cardName = cardNameInput.value;
    const cardUrl = cardUrlInput.value;
    closeModal(cardAdditionModal, closeCardAdditionalModalButton);
    cardList.prepend(createCard({name: cardName, link: cardUrl}, deleteCard, cardTemplate, likeHandler, cardOpeningModal, openModal, closeModal));
}
// Слушатель отправки формы
cardFormElement.addEventListener('submit', handleAddCardFormSubmit);
