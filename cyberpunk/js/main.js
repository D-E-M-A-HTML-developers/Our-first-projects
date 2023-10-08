const registrationInputs = document.querySelectorAll('.registration-form__user');
const inputCheckbox = document.querySelector('.registration-form__agreement-input');
const registrationFormButton = document.querySelector('.registration-form__btn');
const agreementTxt = document.querySelector('.form__agreement-txt');

registrationFormButton.addEventListener('click', () => {
	registrationInputs.forEach(element => {
		if (element.textContent === '') {
			element.classList.add('border-input-invalid');
		}
	});
	if (!inputCheckbox.checked) {
		agreementTxt.style.setProperty('--before-border-color', 'red');
	}
});
inputCheckbox.addEventListener('click', () => {
	if (inputCheckbox.checked) {
		agreementTxt.style.setProperty('--before-border-color', '#777');
	}
});

