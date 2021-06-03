const newsletterForm = document.querySelector('#newsletter');
const newsletterInput = document.querySelector('#nEmail');
const newsletterNotification = document.querySelector('#notification');


newsletterForm.addEventListener('submit', function(e){
    e.preventDefault();

    const pattern =  /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/;
    const inputValue = newsletterInput.value.trim();

    if( pattern.test(inputValue) === false ) {
        newsletterNotification.innerHTML = "Error, please provide a valid email";
        newsletterNotification.classList.add("error-n");
    } else {
        newsletterNotification.innerHTML = "Success, email submitted";
        newsletterNotification.classList.remove('error-n');
        newsletterInput.value = "";
    }
})