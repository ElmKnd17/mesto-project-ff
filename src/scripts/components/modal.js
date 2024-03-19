// Обработчик закрытия окна по нажатию Esc
function closeByEcsape(evt) {
    if(evt.key === 'Escape') {
        const modal = document.querySelector('.popup_is-opened');
        const closeButton = modal.querySelector('.popup__close');
        closeModal(modal, closeButton);
    }
}

// Обработчик закрытия окна по нажатию кнопки
function closeByButtonHandler(evt) {
    const modal = evt.target.closest('.popup');
    closeModal(modal, evt.target);
}

// Обработчик закрытия окна по нажатию оверлея
function closeByOverlayHandler(evt) {
    if (evt.target === evt.currentTarget){
        const closeButton = evt.target.querySelector('.popup__close');
        closeModal(evt.target, closeButton);
    }
}

// Функция открытия модального окна
function openModal(modal, closeButton) {
    modal.classList.add('popup_is-opened');
    modal.addEventListener('click', closeByOverlayHandler);
    closeButton.addEventListener('click', closeByButtonHandler);
    document.addEventListener('keydown', closeByEcsape);
}

// Функция закрытия модального окна
function closeModal(modal, closeButton) {
    modal.classList.remove('popup_is-opened');
    modal.removeEventListener('click', closeByOverlayHandler);
    closeButton.removeEventListener('click', closeByButtonHandler);
    document.removeEventListener('keydown', closeByEcsape);
}

export {openModal, closeModal};