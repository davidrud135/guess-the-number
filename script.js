$(document).ready(function() {
  const randomNumber = getRandomIntInclusive();
  const $attemptsHeader = $(`h6`);
  const $form = $('form');
  const $input = $('form input');
  let attemptsAmount = 5;
  let userAttemptsArr = [];

  $form.submit(guess);

  function guess(event) {
    event.preventDefault();

    const inputValue = $input.val();
    if (!inputValue) return;
    const inputNumber = +inputValue;
    userAttemptsArr.push(inputNumber);
    $attemptsHeader.text(
      `Attempts: ${attemptsAmount - userAttemptsArr.length}`
    );

    if (inputNumber === randomNumber) {
      createAlert('win', getGameResultString(userAttemptsArr, randomNumber));
      $form.remove();
      return;
    } else if (inputNumber > randomNumber) {
      createAlert(
        'wrong',
        `Your number '${inputNumber}' is higher than random number.`
      );
    } else {
      createAlert(
        'wrong',
        `Your number '${inputNumber}' is lower than random number.`
      );
    }

    if (userAttemptsArr.length === attemptsAmount) {
      createAlert('loss', getGameResultString(userAttemptsArr, randomNumber));
      $form.remove();
      return;
    }

    $input.val('');
  }

  function createAlert(type, additionalText = '') {
    $('div.alert').remove();
    const $alertBlock = $(`<div class="alert" role="alert"></div>`);
    const $alertHeader = $(`<h4 class="alert-heading py-3"></h4>`);
    const $tryAgainBtn = $(`
      <button type="button" class="btn btn-outline-primary">Try again</button>
    `);
    let alertHeaderText = '';
    let alertColor = '';

    switch (type) {
      case 'win':
        alertHeaderText = 'Congrats! You Won!';
        alertColor = 'success';
        $alertBlock.append($tryAgainBtn);
        break;
      case 'wrong':
        alertHeaderText = 'Oops, wrong';
        alertColor = 'danger';
        break;
      case 'loss':
        alertHeaderText = 'Game over.';
        alertColor = 'dark';
        $alertBlock.append($tryAgainBtn);
    }

    $alertHeader.text(alertHeaderText);
    $alertBlock.prepend($alertHeader);
    if (additionalText) {
      $alertHeader.after(`<p>${additionalText}</p>`);
    }
    $tryAgainBtn.click(() => location.reload());
    $alertBlock.addClass(`alert-${alertColor}`);

    $form.before($alertBlock);
  }
});

function getRandomIntInclusive(min = 0, max = 100) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getGameResultString(attemptsArr, randomNum) {
  return `
    Your attempts were: [${attemptsArr.join(', ')}].
    <br>
    The random number was ${randomNum}.
  `;
}
