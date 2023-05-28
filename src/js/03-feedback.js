import throttle from 'lodash.throttle';

const formEl = document.querySelector('.feedback-form');
const emailEl = document.querySelector('.feedback-form input[name="email"]');
const messageEl = document.querySelector(
  '.feedback-form textarea[name="message"]'
);

const handleInput = throttle(() => {
  const formData = {
    email: emailEl.value,
    message: messageEl.value,
  };
  localStorage.setItem('feedback-form-state', JSON.stringify(formData));
}, 500);

window.addEventListener('DOMContentLoaded', () => {
  const formDataString = localStorage.getItem('feedback-form-state');
  if (formDataString) {
    const formData = JSON.parse(formDataString);
    emailEl.value = formData.email || '';
    messageEl.value = formData.message || '';
  }
});

emailEl.addEventListener('input', handleInput);
messageEl.addEventListener('input', handleInput);

formEl.addEventListener('submit', event => {
  event.preventDefault();

  const formData = {
    email: emailEl.value,
    message: messageEl.value,
  };

  console.log('Form submitted:');
  console.log(formData);

  localStorage.removeItem('feedback-form-state');
  emailEl.value = '';
  messageEl.value = '';
});
