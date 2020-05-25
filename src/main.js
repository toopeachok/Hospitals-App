import '@/styles/main.scss'
import '@/styles/modal.scss'
import {renderHospitalsTable} from "@/HospitalsCards/RenderHospitals";
import {getFileData} from "@/GetFileData";
import {addToLocalStorage} from "@/LocalStorage";
import {addHospitalCard} from "@/HospitalsCards/CardControls";


const getDataFromServerBtn = document.querySelector('#get-data-from-server-btn');

getDataFromServerBtn.addEventListener('click', () => {

  let fileURL = '../src/data/lpu.json';

  getFileData(fileURL)
    .then(data => JSON.parse(data))
    .then(addToLocalStorage)
    .then(() => {
      return JSON.parse(localStorage.getItem('hospitals'));
    })
    .then(renderHospitalsTable)
    .then(() => {
      const addCardBtn = document.querySelector('#add-hospital-btn');
      addCardBtn.addEventListener('click', addHospitalCard);
      addCardBtn.style.display = 'block';
      getDataFromServerBtn.style.display = 'none';
    })
    .catch(err => console.log(err));

});



