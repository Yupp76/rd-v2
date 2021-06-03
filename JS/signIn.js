const form = document.querySelector("#sign-in");
const email = document.querySelector("#email");
const password = document.querySelector("#password");

const emailNotification = document.querySelector("#note-email");
const passwordNotification = document.querySelector("#note-password");
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
  
  const emailVal = email.value.trim();
  const passVal = password.value.trim();

  const regExp = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/;
  
  errorFieldCleaner(emailNotification);
  errorFieldCleaner(passwordNotification);

  if (passVal.length === 0) {
    errorFieldRender(passwordNotification, "password is required");
  }

  if (regExp.test(emailVal) === false) {
    errorFieldRender(emailNotification, "please, provide a valid email");
  }

  if (passVal.length > 0 && regExp.test(emailVal) === true) {
    errorFieldCleaner(emailNotification);
    errorFieldCleaner(passwordNotification);

    successNotification.innerHTML =
      "Signed in successfully, you will be redirected to the home page in few seconds";

    setTimeout(function () {
      window.location.replace(window.location.origin);
    }, 5000);
  }
});
