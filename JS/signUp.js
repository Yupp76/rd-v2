const form = document.querySelector("#sign-up");
const name = document.querySelector("#name");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const confirmPassword = document.querySelector("#pass-confirm");

const passLength = 10;

function isValidField(fieldID, value) {
  let isValid = null;
  let regExp = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/;

  switch (fieldID) {
    case "email":
      isValid = regExp.test(value.trim());
      return {
        fieldID,
        isValid,
        notification: "please include a valid email",
      };
    case "password":
      isValid = value.trim().length < passLength ? false : true;
      return {
        fieldID,
        isValid,
        notification: `the password should be at least ${passLength} characters long`,
      };
    case "pass-confirm":
      isValid = value.trim() === password.value.trim();
      return {
        fieldID,
        isValid,
        notification: "the passwords are not identical",
      };
    case "name":
      isValid = value.trim().length < 1 ? false : true;
      return {
        fieldID,
        isValid,
        notification: "please include a valid name",
      };
    default:
      return true;
  }
}

function errorFieldRender(id, notification) {
  const errorNotification = document.querySelector(`#note-${id}`);
  errorNotification.innerHTML = notification;
  errorNotification.classList.add('error-n');
}

function errorFieldCleaner(id) {
  const notification = document.querySelector(`#note-${id}`);
  notification.classList.remove('error-n');
  notification.innerHTML = "";
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  let invalidFields = [];
  let formFields = [name, email, password, confirmPassword];

  formFields.forEach((field) => {
    errorFieldCleaner(field.id);
  });

  for (let field of formFields) {
    const fieldTestOutput = isValidField(field.id, field.value);

    if (fieldTestOutput.isValid === false) {
      invalidFields.push(fieldTestOutput);
    }
  }

  if (invalidFields.length === 1) {
    errorFieldRender(invalidFields[0].fieldID, invalidFields[0].notification);
  } else if (invalidFields.length > 1) {
    invalidFields.forEach((field) => {
      errorFieldRender(field.fieldID, field.notification);
    });
  } else if (invalidFields.length === 0) {
    const results = document.querySelector("#submit-results");
    
    formFields.forEach((field) => {
      field.value = "";
      errorFieldCleaner(field.id);
    });

    results.innerHTML = "Success! Thank you for joining us. you will be redirected to sign in page in few seconds";

    setTimeout(function(){
      window.location.replace(window.location.origin + "/sign-in.html")
    }, 5000)
  }
});
