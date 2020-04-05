import Card from "./Card.js"

const GAME = document.querySelector(".game")
const enemyField = GAME.querySelector('.enemy-field')
const playerField = GAME.querySelector('.player-field')
const playerHand =  GAME.querySelector('.field.player-hand')
const generateCard = GAME.querySelector(".generate-card")
const battle = GAME.querySelector(".start-battle")
const mana = GAME.querySelector(".mana")

class Game{
    constructor(mana){
        this.mana = mana
        this.enemyCards = null
        this.playerCards = null
        this.createEnemyCard()
        this.setMana()
    }
    setMana(){
        mana.innerText = "mana: " + this.mana
    }
    createPlayerCard(){
        if(this.mana>0){
            new Card(1,1, playerHand, true, GAME, this)
            this.mana--
            mana.innerText = "mana: " + this.mana
        }
    }
    createEnemyCard(){
        new Card(1,1,enemyField, false, GAME, this)
        
    }
    battle(){
        let playerBattlefield = []
        let enemyBattlefield = []
        let playerCards = playerField.querySelectorAll(".card")
        let enemyCards = enemyField.querySelectorAll(".card")
       for(let i =0;i<playerCards.length;i++){
        playerBattlefield.push([playerCards[i].querySelector(".attack").innerText, playerCards[i].querySelector(".defence").innerText])
        console.log(playerBattlefield);
       }
       for(let i=0;i<enemyCards.length;i++){
        enemyBattlefield.push([playerCards[i].querySelector(".attack").innerText, playerCards[i].querySelector(".defence").innerText])
        console.log(enemyBattlefield)
       }
       for(let i =0; i< playerBattlefield.length;i++){
           for(let j = 0;j< enemyBattlefield.length;j++){
              console.log(playerBattlefield[i][1], enemyBattlefield[j][0])
              playerBattlefield[i][1] = parseInt(playerBattlefield[i][1], 10) - parseInt(enemyBattlefield[j][0], 10)
              enemyBattlefield[j][1] -= playerBattlefield[i][0]
              console.log(playerBattlefield, enemyBattlefield)
           }
       }
       for(let i =0;i<playerCards.length;i++){
        playerCards[i].querySelector(".defence").innerText = playerBattlefield[i][1]
        playerCards[i].classList.add("animation")
       }
       for(let i =0;i<enemyCards.length;i++){
        enemyCards[i].querySelector(".defence").innerText = enemyBattlefield[i][1]
       
       }
       setTimeout(function(){
            for(let i =0;i<playerCards.length;i++){
                if(playerCards[i].querySelector(".defence").innerText == 0){
                   playerCards[i].remove()
                }
           }
            for(let i =0;i<enemyCards.length;i++){
                if(enemyCards[i].querySelector(".defence").innerText == 0){
                    enemyCards[i].remove()
                 }
           }
       },800)
    }
}

let newGame = new Game(1)


generateCard.addEventListener("click", function(){
    newGame.createPlayerCard()
})

battle.addEventListener("click", function(){
    newGame.battle()
})
