import {$} from "@/modal/base";
import "@/modal/modal"
import "@/modal/EditCardModal"


export function cardButtonsHandler(event) {

  if (event.target.dataset['btnType'] === 'delete') {
    _removeCard(event);
  }

  if (event.target.dataset['btnType'] === 'edit') {

    const id = parseInt(event.target.dataset['cardId']);

    const card = document.querySelector(`#card-${id}`);

    const editModal = $.editCardModal({
      title: 'Редактировать',
      content: `
        <form name="edit-card-form">
          <div class="form-group">
            <label for="hospital-name-input">
              Название
            </label>
            <input class="form-control"
            name="hospital-name-input"
            type="text">
          </div>
          <div class="form-group">
            <label for="hospital-address-input">
              Адрес
            </label>
            <input class="form-control"
            name="hospital-address-input"
            type="text">
          </div>
          <div class="form-group">
            <label for="hospital-phone-input">
              Телефон
            </label>
            <input class="form-control"
            name="hospital-phone-input"
            type="text">
          </div>
        </form>
      `,
      formSubmitButtonOptions: ['submit', 'edit-card-form'],
    });

    editModal
      .then(() => {

        const editForm = document.forms['edit-card-form'];

        const name = editForm['hospital-name-input'].value;

        const address = editForm['hospital-address-input'].value;

        const phone = editForm['hospital-phone-input'].value;

        card.querySelector('.hospital-name').textContent = name;

        card.querySelector('.hospital-address').textContent = address;

        card.querySelector('.hospital-phone-link').textContent = phone;

        _changeCardInLocalStorage(id, name, address, phone);

      });
  }

}

function _removeCard(event) {

  const cardID = `#card-${event.target.dataset['cardId']}`;

  const card = document.querySelector(cardID);

  card.classList.add('hide-hospital-card');

  setTimeout(() => {
    _removeCardFromLocalStorage(`${event.target.dataset['cardId']}`);
    card.querySelector('.card-buttons').removeEventListener('click', cardButtonsHandler);
    card.remove();
  }, 500);

}

function _removeCardFromLocalStorage(index) {

  let hospitals = JSON.parse(localStorage.getItem('hospitals'));

  hospitals[parseInt(index)] = {};

  localStorage.setItem('hospitals', JSON.stringify(hospitals));

}

function _changeCardInLocalStorage(index, name, address, phone) {

  let hospitals = JSON.parse(localStorage.getItem('hospitals'));

  hospitals[parseInt(index)]['full_name'] = name;

  hospitals[parseInt(index)]['address'] = address;

  hospitals[parseInt(index)]['phone'] = phone;

  localStorage.setItem('hospitals', JSON.stringify(hospitals));

}

