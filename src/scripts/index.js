// Импорт стилей
import '../pages/index.css';
// Импорт из cards.js
import { initialCards, createCard, deleteCard, likeHandler } from './components/cards.js';
// Импорт из modal.js
import { openModal, closeModal, setModalListeners } from './components/modal.js';

// МОДАЛЬНЫЕ ОКНА
    // Модальное окно редактирования профиля
const openProfileModalButton = document.querySelector('.profile__edit-button'); // Кнопка редактирвоания профиля
const profileModal = document.querySelector('.popup_type_edit'); // Модальное окно редактирования профиля
const closeProfileModalButton = profileModal.querySelector('.popup__close'); // Кнопка закрытия модального окна редактироваия профиля
const profileFormElement = profileModal.querySelector('.popup__form'); // Форма модального окна редактироваия профиля
    // Установка слушателя на кнопку открытия модального окна
openProfileModalButton.addEventListener('click', () => {
    setModalListeners(profileModal, profileFormElement, closeProfileModalButton);
})
    // Модальное окно редактирования карточки
const openCardAdditionModalButton = document.querySelector('.profile__add-button'); // Кнопка добавления карточки
const cardAdditionModal = document.querySelector('.popup_type_new-card'); // Модальное окно добавления карточки
const closeCardAdditionalModalButton = cardAdditionModal.querySelector('.popup__close'); // Кнопка закрытия модального окна добавления карточки
const cardFormElement = cardAdditionModal.querySelector('.popup__form'); // Форма модального окна добавления карточки
    // Установка слушателя на кнопку открытия модального окна
openCardAdditionModalButton.addEventListener('click', () => {
    setModalListeners(cardAdditionModal, cardFormElement, closeCardAdditionalModalButton);
})

// КАРТОЧКИ
    // Модальное окно карточки
const cardOpeningModal = document.querySelector('.popup_type_image'); // Модальное окно открытой карточки
    // Список карточек
const cardList = document.querySelector('.places__list');
    // Темплейт карточки
const cardTemplate = document.querySelector('#card-template');
    // Вывод карточек на страницу
initialCards.forEach(element => {
    cardList.append(createCard(element, deleteCard, cardTemplate, likeHandler, cardOpeningModal, openModal, closeModal));
})

// ФОРМЫ
    // Форма профиля
        // Обработчик «отправки» формы
function handleEditProfileFormSubmit(evt) {
    evt.preventDefault();
        // Установка соответствующих значений
    profileTitle.textContent = profileNameInput.value;
    profileDescription.textContent = profileJobInput.value;
    closeModal(profileModal);
    evt.currentTarget.reset();
}
        // Выбор изменяемых формой элементов
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
        // Выбор полей формы
const profileNameInput = profileFormElement.querySelector('.popup__input_type_name');
const profileJobInput = profileFormElement.querySelector('.popup__input_type_description');
        // Слушатель отправки формы
profileFormElement.addEventListener('submit', handleEditProfileFormSubmit);

    // Форма карточки
        // Обработчик «отправки» формы
function handleAddCardFormSubmit(evt) {
    evt.preventDefault();
        // Выбор изменяемых формой элементов
    const cardName = cardNameInput.value;
    const cardUrl = cardUrlInput.value;
    closeModal(cardAdditionModal);
    evt.currentTarget.reset();
    cardList.prepend(createCard({name: cardName, link: cardUrl}, deleteCard, cardTemplate, likeHandler, cardOpeningModal, openModal, closeModal));
}
        // Выбор полей формы
const cardNameInput = cardFormElement.querySelector('.popup__input_type_card-name');
const cardUrlInput = cardFormElement.querySelector('.popup__input_type_url');
        // Слушатель отправки формы
cardFormElement.addEventListener('submit', handleAddCardFormSubmit);
