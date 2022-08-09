import throttle from 'lodash.throttle';

const formEl = document.querySelector('.feedback-form');
// const inputEmailEl = document.querySelector('.feedback-form input');
// const textareaEl = document.querySelector('.feedback-form textarea');

formEl.addEventListener('submit', onFormSubmit);
formEl.addEventListener('input', throttle(onFormInput, 500));

const LOCAL_STORAGE_KEY = 'feedback-form-state';

populateInput();

function onFormSubmit(event) {
  event.preventDefault();
  event.currentTarget.reset();

  localStorage.removeItem(LOCAL_STORAGE_KEY);
}

function onFormInput(event) {
  let enteredData = localStorage.getItem(LOCAL_STORAGE_KEY);

  if (enteredData) {
    enteredData = JSON.parse(enteredData);
  } else {
    enteredData = {};
  }
  enteredData[event.target.name] = event.target.value;
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(enteredData));
}

function populateInput() {
  const savedInputs = localStorage.getItem(LOCAL_STORAGE_KEY);

  if (savedInputs) {
    let savedObjectOfInputs = JSON.parse(savedInputs);
    Object.entries(savedObjectOfInputs).forEach(([name, value]) => {
      formEl.elements[name].value = value;
    });
  }
}
