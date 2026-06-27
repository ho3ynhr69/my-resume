
      const states = [
        { state: 'rock', anti: 'paper', emoji: '✊', name: 'سنگ' },
        { state: 'paper', anti: 'scissors', emoji: '✋', name: 'کاغذ' },
        { state: 'scissors', anti: 'rock', emoji: '✌️', name: 'قیچی' }
      ];

      const MAX_SCORE = 5;
      let playerScore = 0;
      let computerScore = 0;
      let equalScore = 0;
      let gameActive = true; // برای کنترل فعال بودن بازی

      const gameWrapper = document.getElementById('gameWrapper');
      const choicesContainer = document.querySelector('.choices');
      const playerChoiceEl = document.getElementById("playerChoice");
      const computerChoiceEl = document.getElementById("computerChoice");
      const playerScoreEl = document.getElementById("playerScore");
      const computerScoreEl = document.getElementById("computerScore");
      const equalScoreEl = document.getElementById("equalScore");
      const resultsContainer = document.querySelector('.results');

      // ساخت دکمه‌های انتخاب
      function renderButtons() {
        choicesContainer.innerHTML = ''; // پاک کردن دکمه‌های قبلی
        states.forEach(item => {
          const button = document.createElement('button');
          button.innerHTML = `${item.emoji} ${item.name}`; // نمایش ایموجی و نام
          button.dataset.choice = item.state; // ذخیره state در data-attribute
          button.onclick = () => makeTurn(item);
          choicesContainer.appendChild(button);
        });
      }

      // تابع انجام یک دست بازی
      function makeTurn(playerChoiceObj) {
        if (!gameActive) return; // اگر بازی تمام شده، هیچ کاری نکن

        const randomIndex = Math.floor(Math.random() * states.length);
        const computerChoiceObj = states[randomIndex];

        playerChoiceEl.textContent = playerChoiceObj.emoji;
        computerChoiceEl.textContent = computerChoiceObj.emoji;

        let roundResultText = '';
        if (playerChoiceObj.state === computerChoiceObj.state) {
          equalScore++;
          roundResultText = 'مساوی!';
        } else if (playerChoiceObj.state === computerChoiceObj.anti) {
          playerScore++;
          roundResultText = 'شما برنده شدید!';
        } else { // computerChoiceObj.state === playerChoiceObj.anti
          computerScore++;
          roundResultText = 'حریف برنده شد!';
        }

        equalScoreEl.textContent = equalScore;
        playerScoreEl.textContent = playerScore;
        computerScoreEl.textContent = computerScore;

        // نمایش نتیجه راند برای چند ثانیه
        const roundResult = document.createElement('p');
        roundResult.textContent = roundResultText;
        roundResult.style.fontWeight = 'bold';
        roundResult.style.margin = '15px 0 10px 0';
        roundResult.style.color = '#6c757d';
        resultsContainer.appendChild(roundResult);

        // حذف پیام نتیجه راند بعد از چند ثانیه
        setTimeout(() => {
          roundResult.remove();
        }, 2000); // 2 ثانیه

        // بررسی پایان بازی
        if (playerScore >= MAX_SCORE || computerScore >= MAX_SCORE) {
          endGame();
        }
      }

      // تابع پایان بازی
      function endGame() {
        gameActive = false;
        let finalMessage = '';
        let messageClass = '';

        if (playerScore > computerScore) {
          finalMessage = 'شما قهرمان شدید! 🏆';
          messageClass = 'winner';
        } else if (computerScore > playerScore) {
          finalMessage = 'حریف شما را شکست داد! 😞';
          messageClass = 'winner'; // می‌تونه کلاس winner باشه یا یه کلاس جدا
        } else {
          finalMessage = 'بازی با تساوی به پایان رسید!';
          messageClass = 'tie';
        }

        const winnerMessage = document.createElement('p');
        winnerMessage.textContent = finalMessage;
        winnerMessage.className = messageClass;
        resultsContainer.appendChild(winnerMessage);

        // اضافه کردن دکمه شروع مجدد
        const restartButton = document.createElement('button');
        restartButton.textContent = 'شروع مجدد';
        restartButton.style.marginTop = '30px';
        restartButton.style.padding = '15px 30px';
        restartButton.style.fontSize = '1.5em';
        restartButton.style.background = 'linear-gradient(45deg, #6a11cb 0%, #2575fc 100%)';
        restartButton.style.color = 'white';
        restartButton.onclick = restartGame;
        gameWrapper.appendChild(restartButton);

        // غیرفعال کردن دکمه‌های انتخاب
        const buttons = choicesContainer.querySelectorAll('button');
        buttons.forEach(button => button.disabled = true);
      }

      // تابع شروع مجدد بازی
      function restartGame() {
        playerScore = 0;
        computerScore = 0;
        equalScore = 0;
        gameActive = true;

        playerScoreEl.textContent = playerScore;
        computerScoreEl.textContent = computerScore;
        equalScoreEl.textContent = equalScore;
        playerChoiceEl.textContent = '❔';
        computerChoiceEl.textContent = '❔';

        // حذف پیام نتیجه نهایی و دکمه شروع مجدد
        const existingWinnerMessage = resultsContainer.querySelector('.winner, .tie');
        if (existingWinnerMessage) {
          existingWinnerMessage.remove();
        }
        const restartButton = gameWrapper.querySelector('button[onclick="restartGame()"]');
        if (restartButton) {
          restartButton.remove();
        }

        // فعال کردن دوباره دکمه‌های انتخاب
        renderButtons();
      }

      // راه‌اندازی اولیه بازی
      renderButtons();
