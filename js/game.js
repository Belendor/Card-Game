import Card from "./Card.js"

const GAME = document.querySelector(".game")
const fields = GAME.querySelector('.field')
const playerHand =  GAME.querySelector('.field.player-hand')
const generateCard = GAME.querySelector(".generate-card")

generateCard.addEventListener("click", function(){
    new Card(1,1, playerHand, GAME)
})
