const game = () => {
  let pScore = 0;
  let cScore = 0;
 

  //Start the Game
  const startGame = () => {
    const playBtn = document.querySelector(".intro button");
    const introScreen = document.querySelector(".intro");
    const match = document.querySelector(".match");
    const player = document.querySelector(".player");
    const selectPlayer = document.querySelector(".select-player");

    playBtn.addEventListener("click", () => {
      introScreen.classList.add("fadeOut");
      match.classList.add("fadeIn");
      player.textContent = selectPlayer.value;
    });
  };
  //Play Match
  const playMatch = () => {
    const options = document.querySelectorAll(".options button");
    const playerHand = document.querySelector(".player-hand");
    const computerHand = document.querySelector(".computer-hand");
    const hands = document.querySelectorAll(".hands img");

    hands.forEach(hand => {
      hand.addEventListener("animationend", function() {
        this.style.animation = "";
      });
    });
    //Computer Options
    const computerOptions = ["pierre", "papier", "ciseaux"];

    options.forEach(option => {
      option.addEventListener("click", function() {
        //Computer Choice
        const computerNumber = Math.floor(Math.random() * 3);
        const computerChoice = computerOptions[computerNumber];

        setTimeout(() => {
          //Here is where we call compare hands
          compareHands(this.textContent, computerChoice);
          //Update Images
          playerHand.src = `./assets/${this.textContent}.png`;
          computerHand.src = `./assets/${computerChoice}.png`;
        }, 2000);
        //Animation
        playerHand.style.animation = "shakePlayer 2s ease";
        computerHand.style.animation = "shakeComputer 2s ease";
      });
    });
  };

  const updateScore = () => {
    const playerScore = document.querySelector(".player-score p");
    const computerScore = document.querySelector(".computer-score p");
    playerScore.textContent = pScore;
    computerScore.textContent = cScore;

    //le premier arrivé à 3 gagne
    if (pScore === 3 && cScore < pScore ) 
      {
        alert (`Bravo, tu as réussi mon challenge !`),
        location.reload(true)         
        }else if(cScore === 3 && cScore > pScore )      
      {
          alert ("Pas de chance, tu peux recommencer mais attention car Arnold est vraiment puissant !"),
          location.reload(true)
      }
  };
  const compareHands = (playerChoice, computerChoice) => {
    //Update Text
    const winner = document.querySelector(".winner");
    //Checking for a tie
    if (playerChoice === computerChoice) {
      winner.textContent = "Egalité";
      return;
    }
    //Check for Rock
    if (playerChoice === "pierre") {
      if (computerChoice === "ciseaux") {
        winner.textContent = "Tu bats Arnold";
        pScore++;
        updateScore();
        return;
      } else {
        winner.textContent = "Arnold gagne";
        cScore++;
        updateScore();
        return;
      }
    }
    //Check for Paper
    if (playerChoice === "papier") {
      if (computerChoice === "ciseaux") {
        winner.textContent = "Arnold gagne";
        cScore++;
        updateScore();
        return;
      } else {
        winner.textContent = "Tu bats Arnold";
        pScore++;
        updateScore();
        return;
      }
    }
    //Check for Scissors
    if (playerChoice === "ciseaux") {
      if (computerChoice === "pierre") {
        winner.textContent = "Arnold gagne";
        cScore++;
        updateScore();
        return;
      } else {
        winner.textContent = "Tu bats Arnold";
        pScore++;
        updateScore();
        return;
      }
    }
  };

  //Is call all the inner function
  startGame();
  playMatch();
};

//start the game function
game();