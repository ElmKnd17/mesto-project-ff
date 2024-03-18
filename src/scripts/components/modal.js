// Обработчик слушателя кнопки Escape
function closeByEcsape(evt) {
    if(evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_is-opened');
        const openedPopupForm = openedPopup.querySelector('.popup__form');
        closeModal(openedPopup);
        if(openedPopupForm) {
            openedPopupForm.reset();
        }
    }
}

// Функция открытия модального окна
function openModal(modal) {
    modal.classList.add('popup_is-opened');
    document.addEventListener('keydown', closeByEcsape);
}

// Функция закрытия модального окна
function closeModal(modal) {
    modal.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closeByEcsape);
}

// Функция установки слушателей на модальное окно
function setModalListeners(modal, formElement, closeButton) {
    // Открытие модального окна
    openModal(modal);
    // Установка слушателей на способы закрытия модального окна (по кнопке и по нажатию вне окна)
    closeButton.addEventListener('click', () => {
        closeModal(modal);
        formElement.reset();
    })
    modal.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('popup')){
            closeModal(evt.target);
            formElement.reset();
        }
    })
}

export {openModal, closeModal, setModalListeners};