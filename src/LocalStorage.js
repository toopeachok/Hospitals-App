export function addToLocalStorage(data) {
  localStorage.setItem('hospitals', JSON.stringify(data));
}