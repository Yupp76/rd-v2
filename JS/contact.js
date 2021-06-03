const form = document.querySelector("#contact");
const name = document.querySelector("#name");
const email = document.querySelector("#email");
const message = document.querySelector("#message");

const nameNotification = document.querySelector("#note-name");
const emailNotification = document.querySelector("#note-email");
const messageNotification = document.querySelector("#note-message");
const successNotification = document.querySelector("#submit-results");

function errorFieldRender(htmlElement, notification) {
  htmlElement.innerHTML = notification;
  htmlElement.classList.add("error-n");
}

function errorFieldCleaner(htmlElement) {
  htmlElement.classList.remove("error-n");
  htmlElement.innerHTML = "";
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  
  const nameVal = name.value.trim();
  const emailVal = email.value.trim();
  const messageVal = message.value.trim();

  const regExp = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/;

  errorFieldCleaner(nameNotification);
  errorFieldCleaner(emailNotification);
  errorFieldCleaner(messageNotification);

  if (nameVal.length === 0) {
    errorFieldRender(nameNotification, "Name is required");
  }

  if (regExp.test(emailVal) === false) {
    errorFieldRender(emailNotification, "please, provide a valid email");
  }

  if (messageVal.length === 0) {
    errorFieldRender(messageNotification, "please, provide a valid message");
  }

  if (nameVal.length && regExp.test(emailVal) && messageVal.length) {
    errorFieldCleaner(nameNotification);
    errorFieldCleaner(emailNotification);
    errorFieldCleaner(messageNotification);

    successNotification.innerHTML = "message sent successfully";
  }
});
