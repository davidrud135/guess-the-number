const randomNumber = getRandomIntInclusive();
const alertBlock = getElem('alertBlock');
const attemptsHeader = getElem('attemptsHeader');
const tryAgainBtn = getElem('tryAgainBtn');
let attemptsAmount = 5;

hide(alertBlock);
hide(tryAgainBtn);

function getElem(id) {
  return document.getElementById(id);
}

function guess(event) {
  const [inputElem] = event.target;
  const inputValue = inputElem.value;
  if (!inputValue) return;
  const userNumber = +inputValue;
  attemptsAmount -= 1;
  attemptsHeader.innerText = `Attempts: ${attemptsAmount}`;

  if (userNumber === randomNumber) {
    showAlert('correct');
    display(tryAgainBtn);
    hide(event.target);
    return;
  } else if (userNumber > randomNumber) {
    showAlert('wrong', 'Your number is higher than random number.');
  } else {
    showAlert('wrong', 'Your number is lower than random number.');
  }

  if (!attemptsAmount) {
    showAlert('lost', `The random number was ${randomNumber}.`);
    display(tryAgainBtn);
    hide(event.target);
  }
  event.target.reset();
}

function getRandomIntInclusive(min = 0, max = 100) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function showAlert(type, additionalText = '') {
  let alertHeaderText = '';
  let alertType = '';
  switch (type) {
    case 'correct':
      alertHeaderText = 'Congrats! You Won!';
      alertType = 'success';
      break;
    case 'wrong':
      alertHeaderText = 'Oops, wrong.';
      alertType = 'danger';
      break;
    case 'lost':
      alertHeaderText = 'Sorry, the game is over';
      alertType = 'dark';
  }

  alertBlock.classList.add(`alert-${alertType}`);
  alertBlock.innerHTML = `
    <h4 class="alert-heading">${alertHeaderText}</h4>
  `;
  if (additionalText) {
    alertBlock.innerHTML += `<p>${additionalText}</p>`;
  }
  display(alertBlock);
}

function display(element) {
  element.style.display = 'block';
}

function hide(element) {
  element.style.display = 'none';
}

function reload() {
  location.reload();
}
