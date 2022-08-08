import throttle from 'lodash.throttle';

const refs = {
  formEl: document.querySelector('.feedback-form'),
  inputEmailEl: document.querySelector('.feedback-form input'),
  textareaEl: document.querySelector('.feedback-form textarea'),
};

refs.formEl.addEventListener('submit', onFormSubmit);
refs.formEl.addEventListener('input', throttle(onFormInput, 500));

const LOCAL_STORAGE_KEY = 'feedback-form-state';
const formData = {};

populateInput();

function onFormSubmit(event) {
  event.preventDefault();
  event.currentTarget.reset();
  localStorage.removeItem(LOCAL_STORAGE_KEY);
}

function onFormInput(event) {
  formData[event.target.name] = event.target.value;
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(formData));
}

function populateInput() {
  const savedInputs = localStorage.getItem(LOCAL_STORAGE_KEY);
  const savedObjectOfInputs = JSON.parse(savedInputs);

  if (savedObjectOfInputs) {
    refs.inputEmailEl.value = savedObjectOfInputs.email;
    refs.textareaEl.value = savedObjectOfInputs.message;
  }
}
