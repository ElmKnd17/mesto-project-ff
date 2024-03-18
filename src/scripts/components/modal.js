function openModal(window) {
    window.style.visibility = 'visible';
    window.style.opacity = 1;
    window.style.pointerEvents = 'all';
    window.style.userSelect = 'text';
}

function closeModal(window) {
    window.style.visibility = 'hidden';
    window.style.opacity = 0;
    window.style.pointerEvents = 'none';
    window.style.userSelect = 'none';
}

    // Функция добавления слушателей событий на модальное окно
    // (я бы добавил её в modal.js, но в условии говорится, что обработчики модальных окон должны находиться в index.js)
    function setModalListeners(modal, openButton) {
        // Функция очистки инпутов (при их наличии)
        function clearInputs() {
            const form = modal.querySelector('.popup__form');
            if(form) {
               form.reset();
            }
        }
        // Обработчик события Escape
        function escapeHandler(evt) {
            if(evt.key === "Escape") {
                closeModal(modal);
                evt.currentTarget.removeEventListener('keydown', escapeHandler);
    
                clearInputs();
            }
        }
        // Добавление слушателя событие на кнопку открытия модального окна
        openButton.addEventListener('click', () => {
            openModal(modal);
    
            // Добавление слушателя событий на кнопку Esc (только в случае открытия модального окна)
            document.addEventListener('keydown', escapeHandler);
        });
        // Добавление слушателя событие на кнопку закрытия модального окна
        const closeButton = modal.querySelector('.popup__close');
        closeButton.addEventListener('click', () => {
            closeModal(modal);
    
            clearInputs();
        });
        // Добавление слушателя события на оверлей
        modal.addEventListener('click', (evt) => {
            if (evt.target.classList.contains('popup')){
                closeModal(modal);
    
                clearInputs();
            }
        });
    }

export {closeModal, setModalListeners};