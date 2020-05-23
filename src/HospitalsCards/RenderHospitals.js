export function renderHospitalsTable(hospitals) {

  const $hospitals = document.createElement('div');

  $hospitals.classList.add('hospitals');

  for (let i = 0; i < hospitals.length; i++) {
    if (Object.keys(hospitals[i]).length) {
      $hospitals.innerHTML += _createHospitalCard(hospitals[i], i);
    }
  }

  document.querySelector('.container').insertAdjacentElement('beforeend', $hospitals);

}

function _createHospitalCard(hospital, cardID) {

  let html = `
  
  <div class="hospital-card card" id="card-${cardID}">
    <h5 class="hospital-name card-title">${hospital['full_name']}</h5>
    <div class="hospital-address">${hospital['address']}</div>
    <div class="hospital-phone">
      <a class="hospital-phone-link" href="tel:${hospital['phone']}">${hospital['phone']}</a>
    </div>
    <div class="card-buttons">
      <button class="btn btn-outline-danger hospital-button" data-btn-type="delete" data-card-id="${cardID}">удалить</button>
      <button class="btn btn-outline-primary hospital-button" data-btn-type="edit" data-card-id="${cardID}">редактировать</button>
    </div>
  </div>
  
  `;

  return html;

}
