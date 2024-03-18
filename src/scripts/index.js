// Импорт стилей
import '../pages/index.css';
// Импорт из cards.js
import { initialCards, createCard, deleteCard, likeHandler } from './components/cards.js';
// Импорт из modal.js
import { closeModal, setModalListeners } from './components/modal.js';

// МОДАЛЬНЫЕ ОКНА
    // Модальное окно редактирования профиля
const openProfileModalButton = document.querySelector('.profile__edit-button'); // Кнопка редактирвоания профиля
const profileModal = document.querySelector('.popup_type_edit'); // Модальное окно редактирования профиля
setModalListeners(profileModal, openProfileModalButton);
    // Модальное окно редактирования карточки
const openCardAdditionModalButton = document.querySelector('.profile__add-button'); // Кнопка добавления карточки
const cardAdditionModal = document.querySelector('.popup_type_new-card'); // Модальное окно добавления карточки
setModalListeners(cardAdditionModal, openCardAdditionModalButton);
    // Модальное окно карточки
const cardOpeningModal = document.querySelector('.popup_type_image'); // Модальное окно открытой карточки

// КАРТОЧКИ
    // DOM узлы
const cardList = document.querySelector('.places__list');
    // Темплейт карточки
const cardTemplate = document.querySelector('#card-template');
    // Выввод карточек на страницу
initialCards.forEach(element => {
    cardList.append(createCard(element, deleteCard, cardTemplate, likeHandler, cardOpeningModal, setModalListeners));
})

// ФОРМЫ
    // Форма профиля
        // Обработчик «отправки» формы
function handleEditProfileFormSubmit(evt) {
    evt.preventDefault(); 
        // Вставьте новые значения с помощью textContent
    profileTitle.textContent = profileNameInput.value;
    profileDescription.textContent = profileJobInput.value;
    closeModal(profileModal);
    evt.currentTarget.reset();
}
        // Выберите элементы, куда должны быть вставлены значения полей
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
        // Находим форму в DOM
const profileFormElement = profileModal.querySelector('.popup__form'); // Воспользуйтесь методом querySelector()
        // Находим поля формы в DOM
const profileNameInput = profileFormElement.querySelector('.popup__input_type_name'); // Воспользуйтесь инструментом .querySelector()
const profileJobInput = profileFormElement.querySelector('.popup__input_type_description'); // Воспользуйтесь инструментом .querySelector()
        // Прикрепляем обработчик к форме:
        // он будет следить за событием “submit” - «отправка»
profileFormElement.addEventListener('submit', handleEditProfileFormSubmit);

    // Форма карточки
        // Обработчик «отправки» формы
    function handleAddCardFormSubmit(evt) {
        evt.preventDefault();
        // Выберите элементы, куда должны быть вставлены значения полей
        const cardName = cardNameInput.value;
        const cardUrl = cardUrlInput.value;
        evt.currentTarget.reset();
        cardList.prepend(createCard({name: cardName, link: cardUrl}, deleteCard, cardTemplate, likeHandler, cardOpeningModal, setModalListeners));
    }
        // Находим форму в DOM
const cardFormElement = cardAdditionModal.querySelector('.popup__form'); // Воспользуйтесь методом querySelector()
        // Находим поля формы в DOM
const cardNameInput = cardFormElement.querySelector('.popup__input_type_card-name'); // Воспользуйтесь инструментом .querySelector()
const cardUrlInput = cardFormElement.querySelector('.popup__input_type_url'); // Воспользуйтесь инструментом .querySelector()
cardFormElement.addEventListener('submit', handleAddCardFormSubmit);
