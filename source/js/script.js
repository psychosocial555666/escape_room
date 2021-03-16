'use strict';
(function () {
  var modalCity = document.querySelector('.modal--city');
  var modalQuestion = document.querySelector('.modal--question');
  var cityChoiceButton = document.querySelector('.page-header__city');
  var questionButton = document.querySelector('.page-footer__question');
  var pageBody = document.querySelector('body');
  var storage = window.localStorage;

  pageBody.classList.remove('no-js');

  var openModal = function (modalItem, evt) {
    evt.preventDefault();
    if (modalItem) {
      modalItem.classList.add('modal--show');
      pageBody.classList.add('modal-overlay');
      var closeModalButton = modalItem.querySelector('.modal__close');
      var modalOverlay = modalItem.querySelector('.modal__overlay');

      closeModalButton.addEventListener('click', onCloseButtonPress);
      modalOverlay.addEventListener('click', onOverlayClick);
      window.addEventListener('keydown', onEscKeyPress);
    }
  };

  var closeModal = function () {
    var openedModal = document.querySelector('.modal--show');
    var questionForm = modalQuestion.querySelector('.question');
    var inputs = questionForm.querySelectorAll('input');
    var text = questionForm.querySelector('textarea');
    var modalOverlay = openedModal.querySelector('.modal__overlay');
    var closeModalButton = openedModal.querySelector('.modal__close');

    openedModal.classList.remove('modal--show');
    pageBody.classList.remove('modal-overlay');
    closeModalButton.removeEventListener('click', onCloseButtonPress);
    modalOverlay.removeEventListener('click', onOverlayClick);
    window.removeEventListener('keydown', onEscKeyPress);
    inputs.forEach(function (item) {
      item.removeEventListener('change', onInputChange);
    });
    text.removeEventListener('change', onInputChange);
    questionForm.removeEventListener('submit', onQuestionFormSubmit);
  };

  var checkFormValidity = function () {
    var questionForm = document.querySelector('.question');
    var name = questionForm.querySelector('.question__item--name input').value;
    var email = questionForm.querySelector('.question__item--email input').value;
    var text = questionForm.querySelector('.question__item--text textarea').value;
    var agree = questionForm.querySelector('.question__agree input');
    var submitButton = questionForm.querySelector('.question__submit');

    if (name && email && text && agree.checked) {
      submitButton.classList.remove('question__submit--inactive');
      return true;
    } else {
      submitButton.classList.add('question__submit--inactive');
      return false;
    }
  };

  var checkEveryFieldCorrect = function () {
    var questionForm = document.querySelector('.question');
    var name = questionForm.querySelector('.question__item--name input').value;
    var email = questionForm.querySelector('.question__item--email input').value;
    var text = questionForm.querySelector('.question__item--text textarea').value;
    var agree = questionForm.querySelector('.question__agree input').checked;
    var nameField = questionForm.querySelector('.question__item--name');
    var emailField = questionForm.querySelector('.question__item--email');
    var textField = questionForm.querySelector('.question__item--text');
    var agreeField = questionForm.querySelector('.question__agree');
    var mask = /\S+@\S+\.\S+/;

    var makeValid = function (item) {
      item.classList.remove('question__item--invalid');
    };

    var makeInvalid = function (item) {
      item.classList.add('question__item--invalid');
    };

    if (!name) {
      makeInvalid(nameField);
      return false;
    } else {
      makeValid(nameField);
    }


    if (!mask.test(email)) {
      makeInvalid(emailField);
      return false;
    } else {
      makeValid(emailField);
    }

    if (!text) {
      makeInvalid(textField);
      return false;
    } else {
      makeValid(textField);
    }

    if (!agree) {
      makeInvalid(agreeField);
      return false;
    } else {
      makeValid(agreeField);
    }

    storage.name = name;
    storage.email = email;
    storage.text = text;

    return true;
  };

  var putFocus = function () {
    var questionForm = document.querySelector('.question');
    var nameField = questionForm.querySelector('.question__item--name input');
    var agree = questionForm.querySelector('.question__agree input');
    if (storage.name && storage.email && storage.text) {
      questionForm.querySelector('.question__item--name input').value = storage.getItem('name');
      questionForm.querySelector('.question__item--email input').value = storage.getItem('email');
      questionForm.querySelector('.question__item--text textarea').value = storage.getItem('text');
      agree.focus();
    } else {
      nameField.focus();
    }
  };

  var onInputChange = function () {
    checkFormValidity();
  };

  var onCityModalOpen = function (evt) {
    if (modalCity) {
      openModal(modalCity, evt);
    }
  };

  var onQuestionModalOpen = function (evt) {
    if (modalQuestion) {
      openModal(modalQuestion, evt);
      putFocus();

      var questionForm = modalQuestion.querySelector('.question');
      var inputs = questionForm.querySelectorAll('input');
      var text = questionForm.querySelector('textarea');

      checkFormValidity();

      inputs.forEach(function (item) {
        item.addEventListener('change', onInputChange);
      });
      text.addEventListener('change', onInputChange);

      questionForm.addEventListener('submit', onQuestionFormSubmit);
    }
  };

  var onQuestionFormSubmit = function (evt) {
    evt.preventDefault();
    checkEveryFieldCorrect();
    if (checkEveryFieldCorrect() && checkFormValidity()) {
      closeModal();
    }
  };

  var onCloseButtonPress = function () {
    closeModal();
  };

  var onOverlayClick = function (evt) {
    if (evt.target.matches('.modal__overlay')) {
      closeModal();
    }
  };

  var onEscKeyPress = function (evt) {
    if (evt.keyCode === 27) {
      evt.preventDefault();
      closeModal();
    }
  };

  if (cityChoiceButton) {
    cityChoiceButton.addEventListener('click', onCityModalOpen);
  }

  if (questionButton) {
    questionButton.addEventListener('click', onQuestionModalOpen);
  }
})();

(function () {
  var pageBody = document.querySelector('body');
  var pageHeader = pageBody.querySelector('.page-header');
  var menuToggleButton = pageHeader.querySelector('.page-header__toggle');

  var onTogglePress = function () {
    pageBody.classList.toggle('menu-opened');
    pageHeader.classList.toggle('page-header--menu-opened');
  };

  menuToggleButton.addEventListener('click', onTogglePress);
})();

(function () {
  var header = document.querySelector('.page-header');

  var onWindowScroll = function () {
    if (pageYOffset >= 40) {
      header.classList.add('page-header--onscroll');
    } else {
      header.classList.remove('page-header--onscroll');
    }
  };

  window.addEventListener('scroll', onWindowScroll);
})();
