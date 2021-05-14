let card = document.querySelectorAll(".card");

let hasFlippedCard = false
let firstCard, secondCard;
let lockBoard = false
let i = 0


let cardAddClass = function () {
    if (lockBoard) return;
    if (this === firstCard) return;


    this.classList.add('active')

    if (!hasFlippedCard) {
        hasFlippedCard = true
        firstCard = this
        return
    }
    secondCard = this
    lockBoard = true
    checkedCard()
}
let firstStart = () => {
    let firstStart = confirm(`Start a new game with timer?`)
    firstStart ? timer() : null
}
firstStart();
let start = () => {
    let newGame = confirm(`You time ${sec} second! Want start a new game?`)
    if (newGame == true) {
        card.forEach(n => n.classList.remove("disabled", "active"))
        i = 0;
        sec = 0
        shuffle();
    }
}

let checkedCard = () => {
    let checked = firstCard.dataset.logo === secondCard.dataset.logo;
    checked ? disableCard() : unFlipCard();
}

let disableCard = () => {
    setTimeout(() => {
        firstCard.classList.add("disabled")
        secondCard.classList.add("disabled")
        i++
        console.log(i)
        resetBoard()
        if (i == 1) {
            start();
        }

    }, 1200)

}
let unFlipCard = () => {
    lockBoard = true
    setTimeout(() => {
        firstCard.classList.remove("active");
        secondCard.classList.remove("active");
        resetBoard();
    }, 1200)

}
let resetBoard = () => {
    [hasFlippedCard, lockBoard] = [false, false]
    [firstCard, secondCard] = [null, null]
}
let shuffle = () => {
    card.forEach(c => {
        let random = Math.floor(Math.random() * 12);
        c.style.order = random;
    })
}
shuffle();

function timer () {
     sec = 0
     setInterval(tick, 1000)

 }
function tick (){
     sec++
    console.log(sec)
}



card.forEach(elem => elem.addEventListener("click", cardAddClass))



