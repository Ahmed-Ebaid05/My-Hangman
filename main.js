let lettersDiv = document.querySelector(".letters");
let inputDiv = document.querySelector(".inputs");
let HangmanDivs = Array.from(document.querySelectorAll(".hangman .hangman-body > div"))
let HangmanPart = 0;
let Ending = document.querySelector(".next-game");
let NextBtn = document.querySelector(".next-game .next");
let gameOverBtn = document.querySelector(".next-game .game-over")
let AgainBtn = document.querySelector(".next-game .container .again")
let description = document.querySelector(".description span span");
let WordSpan = document.querySelector(".next-game span");
let CongP = document.querySelector(".next-game p");
let LastLevel = document.querySelector(".next-game .last-level")
let LevelsUl = document.querySelector("header ul");
let TripleBar = document.querySelector("header i");
let counter = 0 ;

const words = [
  "bridge", "castle", "garden", "forest", "market", "village", "pirate", "dragon", "river", "island",
  "helmet", "torch", "sword", "shield", "tower", "mirror", "ladder", "candle", "helmet", "crown",
  "statue", "hunter", "sailor", "valley", "palace", "throne", "window", "bucket", "compass", "harbor" ];

const descriptions = [
  "It lets people go across water without swimming.",             // bridge
  "A big home with walls, often for kings or lords.",             // castle
  "A place where flowers and plants are carefully grown.",        // garden
  "An area full of many trees close together.",                   // forest
  "A busy place where people buy and sell things.",               // market
  "A group of small houses where people live.",                   // village
  "A robber of the seas who steals from ships.",                  // pirate
  "A fire-breathing creature in old stories.",                    // dragon
  "Water that flows across the land into the sea.",               // river
  "Land with water all around it.",                               // island
  "A hard cover to protect the head in battle.",                  // helmet
  "A stick with fire used to give light.",                        // torch
  "A long blade used in fights and battles.",                     // sword
  "A flat piece of armor that blocks attacks.",                   // shield
  "A tall building higher than those around it.",                 // tower
  "It shows your face but it is not water.",                      // mirror
  "Used for climbing up or down, not stairs.",                    // ladder
  "A small stick of wax that burns to make light.",               // candle
  "Clear glass that you look through on walls.",                  // window
  "A golden circle worn on the head by a king or queen.",         // crown
  "A figure of stone or metal made to remember.",                 // statue
  "One who searches for and catches animals.",                    // hunter
  "A man who works and travels on the sea.",                      // sailor
  "Low land that lies between mountains or hills.",               // valley
  "A large, rich home where rulers live.",                        // palace
  "A special chair for a king or queen.",                         // throne
  "Used to carry water or sand with a handle.",                   // bucket
  "It points north and helps people not get lost.",               // compass
  "A safe place where ships rest beside the land."                // harbor
];

let WordIndex = localStorage.getItem("levels") || 0;
let word = words[WordIndex];
description.textContent = descriptions[WordIndex];

for ( let i = 97 ; i <= 122; i++) {
    let letter = document.createElement("div")
    letter.innerHTML = String.fromCharCode(i).toUpperCase()
    lettersDiv.append(letter);
}

let letters = Array.from(document.querySelectorAll(".letters div"));

for ( let i = 0 ; i < word.length ; i ++) {
    let input = document.createElement("div");
    inputDiv.append(input);
}

let inputs = Array.from(document.querySelectorAll(".inputs div"));

for ( let i = 0 ; i < words.length ; i ++) {
    let level = document.createElement("li");
    level.innerHTML = `Level ${i + 1}`;
    if ( localStorage.getItem("LastLevel") < i)
        level.classList.add("disabled");
    LevelsUl.append(level);
}

let levels = Array.from(document.querySelectorAll("ul li"));

TripleBar.addEventListener("click", function() {
    if (LevelsUl.classList.contains("active"))
        LevelsUl.classList.remove("active");
    else {
        LevelsUl.classList.add("active");
    }
})

levels.forEach((level, index) => {
        level.addEventListener("click", function() {
        if ( !level.classList.contains("disabled")) {
            WordIndex = index;
            localStorage.setItem("levels", WordIndex);
            location.reload();
        }
    })
})

letters.forEach((letter) => {
    letter.addEventListener("click", function() {
        if ( !letter.classList.contains("disabled")) {
            letter.classList.add("disabled");
            if (word.toUpperCase().includes(letter.textContent)) {
                for ( let i = 0 ; i < word.length ; i ++) {
                    if ( letter.textContent === word[i].toUpperCase()) {
                        inputs[i].innerHTML = word[i];
                        counter ++;
                        if ( counter === word.length && localStorage.getItem("levels") < 30) {
                            CongP.innerHTML = "Congratulations !!!";
                            WordSpan.innerHTML = `You Win !!!`;
                            NextBtn.style.cssText = "display: block;";
                            setTimeout (() => { Ending.style.cssText = "display: flex; justify-content: center; align-items: center;" }, 1000 );                 
                        } else if (counter === word.length) {
                            CongP.innerHTML = "Congratulations !!!";
                            WordSpan.innerHTML = `You Win !!!`;
                            LastLevel.style.cssText = "display: block;";
                            AgainBtn.style.cssText = "display: block;";
                            setTimeout (() => { Ending.style.cssText = "display: flex;" }, 1000 );    
                        }
                    }
                }
            } else {
                HangmanDivs[HangmanPart].style.cssText = "display: block;";
                HangmanPart++;
                if ( HangmanPart === 9) {
                    WordSpan.innerHTML = `Game Over, The Word Is ${word.toUpperCase()}`;
                    gameOverBtn.style.cssText = "display: block";
                    setTimeout ( () => { Ending.style.cssText = "display: block;" }, 1000 );
                }
            }
        }
    })
})

NextBtn.addEventListener("click", function() { 
    WordIndex++;
    localStorage.setItem("levels", WordIndex);
    if ( WordIndex >= localStorage.getItem("LastLevel"))
        localStorage.setItem("LastLevel", WordIndex);
    location.reload();
});

AgainBtn.addEventListener("click", function() {
    localStorage.setItem("levels", 0);
    location.reload();
})


gameOverBtn.addEventListener("click", () => location.reload());

