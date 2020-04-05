import Card from "./Card.js"

const GAME = document.querySelector(".game")
const enemyField = GAME.querySelector('.enemy-field')
const playerField = GAME.querySelector('.player-field')
const playerHand =  GAME.querySelector('.field.player-hand')
const generateCard = GAME.querySelector(".generate-card")
const battle = GAME.querySelector(".start-battle")

class Game{
    constructor(){
        this.enemyCards = null
        this.playerCards = null
        this.createEnemyCard()
    }
    createPlayerCard(){
        new Card(1,1, playerHand, true, GAME, this)
    }
    createEnemyCard(){
        new Card(1,1,enemyField, false, GAME, this)
        
    }
    battle(){
        console.log(this.enemyCards);
        
        console.log(playerField.querySelectorAll(".card"));

    }
}

let newGame = new Game()


generateCard.addEventListener("click", function(){
    newGame.createPlayerCard()
})

battle.addEventListener("click", function(){
    newGame.battle()
})
