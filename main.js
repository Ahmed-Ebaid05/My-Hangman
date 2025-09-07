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

const words = [ "harbor", "lantern", "anchor", "temple", "glacier", "potion", "helmet",
    "banner", "bridge", "shield", "palace", "pirate", "statue", "canyon", "throne", "forest",
    "mirror", "saddle", "torch", "harvest", "vessel", "fortune", "compass", "copper", "market",
    "sailor", "valley", "desire", "prince", "summit", "Suhila" ];

const descriptions = [
    "A sheltered body of water where ships dock for safety or trade.", "A portable light source protected by glass or metal casing.",
    "A heavy device dropped into water to keep a ship in place.", "A sacred building devoted to spiritual worship or ritual.", 
    "A massive body of ice that moves slowly over land.", "A magical liquid believed to have special effects when consumed.",
    "A hard covering worn to protect the head in danger or battle.", "A flag or cloth hung to represent identity, power, or message.", 
    "A structure allowing passage across rivers, valleys, or obstacles.", "A broad piece of armor carried to block attacks.",
    "A grand residence where rulers or nobles once lived.", "A seafaring thief who plunders ships and coasts.", 
    "A carved figure of stone or metal created to honor or remember.", "A deep gorge formed by erosion, with steep sides of rock.", 
    "An ornate seat that symbolizes royal power and authority.", "A large area filled with dense trees and wildlife.",
    "A smooth surface that reflects an image back to the viewer.",
    "A seat fastened on an animal’s back to ride it.", "A stick with a flame used for light or signal.",
    "The gathering of crops after they have grown and ripened.", "A container designed to hold liquid or transport cargo.",
    "An unexpected turn of luck, wealth, or destiny.", "An instrument that shows direction using Earth’s magnetism.", 
    "A reddish-brown metal often used in coins and wiring.", "A place where goods and produce are sold or traded.",
    "A person who works on a ship and navigates the seas.", "A low landform lying between mountains or hills.", 
    "A strong wish or longing for something not yet reached.", "A son of a king or queen, often an heir.",
    "The highest point of a mountain or achievement.", "The love of my life. <3"
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
                            setTimeout (() => { Ending.style.cssText = "display: flex; padding: 100px 0; justify-content: center; align-items: center;" }, 1000 );                 
                        } else if (counter === word.length) {
                            CongP.innerHTML = "Congratulations !!!";
                            WordSpan.innerHTML = `You Win !!!`;
                            LastLevel.style.cssText = "display: block;";
                            AgainBtn.style.cssText = "display: block;";
                            setTimeout (() => { Ending.style.cssText = "display: flex; padding: 100px 0" }, 1000 );    
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