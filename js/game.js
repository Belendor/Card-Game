import Card from "./Card.js"

const GAME = document.querySelector(".game")
const enemyField = GAME.querySelector('.enemy-field')
const playerField = GAME.querySelector('.player-field')
const playerHand =  GAME.querySelector('.field.player-hand')
const generateCard = GAME.querySelector(".generate-card")
const battle = GAME.querySelector(".start-battle")

class Game{
    constructor(){
        this.createEnemyCard()
    }
    createPlayerCard(){
        new Card(1,1, playerHand, true, GAME)
    }
    createEnemyCard(){
        new Card(1,1,enemyField,false,GAME)
    }
    battle(){

        console.log(playerField.innerHTML);

    }
}


let newGame = new Game()


generateCard.addEventListener("click", function(){
    newGame.createPlayerCard()
})

battle.addEventListener("click", function(){
    newGame.battle()
})