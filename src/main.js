import '@/styles/main.scss'
import '@/styles/modal.scss'
import {renderHospitalsTable} from "@/HospitalsCards/RenderHospitals";
import {getFileData} from "@/GetFileData";
import {addToLocalStorage} from "@/LocalStorage";
import {cardButtonsHandler} from "@/HospitalsCards/CardControls";


let fileURL = '../src/data/lpu.json';

getFileData(fileURL)
  .then(data => JSON.parse(data))
  .then(addToLocalStorage)
  .then(() => {
    return JSON.parse(localStorage.getItem('hospitals'));
  })
  .then(renderHospitalsTable)
  .then(() => {
    document.querySelectorAll('.card-buttons').forEach(item => {
      item.addEventListener('click', event => cardButtonsHandler(event));
    });
  })
  .catch(err => console.log(err));

