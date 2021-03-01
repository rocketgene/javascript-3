//set "name" field to focus state 
const nameField = document.getElementById("name");
nameField.focus();

//hide or show "other job roles" textfield
const otherJobField = document.getElementById("other-job-role");
otherJobField.style.display = 'none';
const jobSelectField = document.getElementById("title");

jobSelectField.addEventListener("change", (e) => {
    if (e.target.value === "other") {
        otherJobField.style.display = 'block';
    } else {
        otherJobField.style.display = 'none';
    }
});

//configure t-shirt color 'select' element to show when t-shirt is selected and show appropriate colors
const shirtColor = document.getElementById('shirt-colors');
shirtColor.style.display = 'none';
const shirtSize = document.getElementById('shirt-sizes');
const shirtDesign = document.getElementById('shirt-designs');
const shirtColorSelect = document.getElementById('color');

shirtDesign.addEventListener("change", (e) => {
    if (e.target.value === "js puns") {
        shirtColor.style.display = 'block';
        shirtColorSelect.children[1].setAttribute('selected', '');
        for (let i = 1; i <= 3; i++) {
            shirtColorSelect.children[i].style.display = 'block';
            shirtColorSelect.children[i+3].style.display = 'none';
        };
    } else {
        shirtColor.style.display = 'block';
        shirtColorSelect.children[4].setAttribute('selected', '');
        for (let i = 1; i <= 3; i++) {
            shirtColorSelect.children[i].style.display = 'none';
            shirtColorSelect.children[i+3].style.display = 'block';
        };
    }
});

//configuring "register for activities" section
const checkboxes = document.querySelectorAll('.activities input');
let activitiesCostElement = document.getElementById('activities-cost');
let activitiesCostValue = 0;

document.querySelector('.activities').addEventListener('change', e => {
    let clicked = e.target;
    let clickedTime = clicked.getAttribute('data-day-and-time');

    //loop to add activities' price to total
    for (let i = 0; i <= 6; i++) {
        if (checkboxes[i].checked === true) {
            activitiesCostValue += parseInt(checkboxes[i].getAttribute('data-cost'));
        }
    }
    activitiesCostElement.textContent = `Total: $${activitiesCostValue}`;
    //loop to prevent clashing activities by enabling/disabling activities
    for (let i = 0; i <= 6; i++) {
        let checkboxTime = checkboxes[i].getAttribute('data-day-and-time');

        if (clickedTime === checkboxTime && clicked !== checkboxes[i]) {
          if (clicked.checked === true) {
            checkboxes[i].disabled = true;
          } else {
            checkboxes[i].disabled = false;
          }
        }
      }
});

//disable payment boxes by default
document.getElementById('credit-card').style.display = 'none';
document.getElementById('paypal').style.display = 'none';
document.getElementById('bitcoin').style.display = 'none';

//enable payment boxes related to payment type selected
let paymentSelect = document.getElementById('payment');
let cardSelected = false;

paymentSelect.addEventListener('change', e => {
    let selectedPaymentType = e.target.value;
    document.getElementById(e.target.value).style.display = 'block';
    if (e.target.value === 'credit-card') {
        cardSelected = true;
    }
    
    for (let i = 1; i <= 3; i++) {
        if (e.target.value !== paymentSelect.children[i].value) {
            document.getElementById(paymentSelect.children[i].value).style.display = 'none';
        }
    }
});

//improving focus states of activities
checkboxes.forEach(activity => {
    activity.addEventListener('focus', e => {
        e.target.parentElement.className = 'focus';
    })
});

checkboxes.forEach(activity => {
    activity.addEventListener('blur', e => {
        e.target.parentElement.classList.remove('focus');
    })
});

//elements used in form validation
const shirtDesignInput = document.getElementById('design');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const cardNumInput = document.getElementById('cc-num');
const zipInput = document.getElementById('zip');
const cvvInput = document.getElementById('cvv');

//validator functions
function validationPass (element) {
    element.parentElement.className = 'valid';
    element.parentElement.classList.remove('not-valid');
    element.parentElement.lastElementChild.style.display = 'none';
  }

function validationFail (element) {
    element.parentElement.className = 'not-valid';
    element.parentElement.classList.remove('valid');
    element.parentElement.lastElementChild.style.display = 'block';
}

//helper functions
const nameValidator = () => {
    const nameIsValid = /^[a-zA-Z]+ ?[a-zA-Z]*? ?[a-zA-Z]*?$/.test(nameInput.value);
    nameIsValid ? validationPass(nameInput) : validationFail(nameInput);
    return nameIsValid;
}

const emailValidator = () => {
    const emailIsValid = /^[^@]+@[^@.]+\.[a-z]+$/i.test(emailInput.value);
    emailIsValid ? validationPass(emailInput) : validationFail(emailInput);
    return emailIsValid;
}

const emailBlankValidator = () => {
    const emailIsBlank = emailInput.value === '';
    return emailIsBlank;
}

const activityValidator = () => {
    const activitySectionIsValid = activitiesCostValue > 0;
    activitySectionIsValid ? validationPass(activitiesCostElement) : validationFail(activitiesCostElement);
    return activitySectionIsValid;
}

const cardNumValidator = () => {
    const cardNumIsValid = /^[\d]{13,16}$/i.test(cardNumInput.value);
    cardNumIsValid ? validationPass(cardNumInput) : validationFail(cardNumInput);
    return cardNumIsValid;
}

const zipValidator = () => {
    const zipIsValid = /^[\d]{5}$/i.test(zipInput.value);
    zipIsValid ? validationPass(zipInput) : validationFail(zipInput);
    return zipIsValid;
}

const cvvValidator = () => {
    const cvvIsValid = /^[\d]{3}$/i.test(cvvInput.value);
    cvvIsValid ? validationPass(cvvInput) : validationFail(cvvInput);
    return cvvIsValid;
}

//real-time error message for card number
cardNumInput.addEventListener('keyup', cardNumValidator);

//prevent submission if >=1 fields are invalid
document.querySelector('form').addEventListener('submit', e => {
    
    if (!nameValidator()) {
        e.preventDefault();
    };
    if (!emailValidator() && emailBlankValidator()) {
        e.preventDefault();
        document.getElementById('email-hint').textContent = 'Email field cannot be blank';
    } else if (!emailValidator()) {
        e.preventDefault();
        document.getElementById('email-hint').textContent = 'Email address must be formatted correctly';
    };
    if (!activityValidator()) {
        e.preventDefault();
    };
    if (cardSelected === true) {
        if (!cardNumValidator()) {
            e.preventDefault();
        };
        if (!zipValidator()) {
            e.preventDefault();
        };
        if (!cvvValidator()) {
            e.preventDefault();
        };
    }
});