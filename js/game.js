import Card from "./Card.js"

const GAME = document.querySelector(".game")
const enemyField = GAME.querySelector('.enemy-field')
const playerField = GAME.querySelector('.player-field')
const playerHand =  GAME.querySelector('.field.player-hand')
const generateCard = GAME.querySelector(".generate-card")
const battle = GAME.querySelector(".start-battle")
const mana = GAME.querySelector(".mana")

class Game{
    constructor(mana,level){
        this.level = level
        this.mana = mana
        this.enemyCards = null
        this.playerCards = null
        this.createEnemyCard()
        this.setMana()
        this.levelCeck()
        this.eventListeners()
    }
    eventListeners(){
        let gameClass = this
        
        generateCard.addEventListener("click", function(){
            gameClass.createPlayerCard()
        })
        
        battle.addEventListener("click", function(){
            gameClass.battle()
        })
    }
    levelCeck(){
        
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
        this.playerCards = playerField.querySelectorAll(".card")
        this.enemyCards = enemyField.querySelectorAll(".card")
        let playerCards = this.playerCards
        let enemyCards = this.enemyCards

       for(let i =0;i<this.playerCards.length;i++){
       
        
        

        playerBattlefield.push([this.playerCards[i].querySelector(".attack").innerText, this.playerCards[i].querySelector(".defence").innerText])
        console.log(playerBattlefield);
       }
       for(let i=0;i<this.enemyCards.length;i++){
        enemyBattlefield.push([this.playerCards[i].querySelector(".attack").innerText, this.playerCards[i].querySelector(".defence").innerText])
        console.log(enemyBattlefield)
       }
       for(let i =0; i< playerBattlefield.length;i++){
           for(let j = 0;j< enemyBattlefield.length;j++){

              let battleStartPlayerHealth = playerBattlefield[i][1]
              let battleStartEnemyHealth = enemyBattlefield[j][1]

              if(battleStartPlayerHealth > 0){
              playerBattlefield[i][1] = parseInt(playerBattlefield[i][1], 10) - parseInt(enemyBattlefield[j][0], 10)
              }
              
              if(battleStartEnemyHealth > 0){       
              enemyBattlefield[j][1] -= playerBattlefield[i][0]
              }
           }
       }
       for(let i =0;i<this.playerCards.length;i++){
        this.playerCards[i].querySelector(".defence").innerText = playerBattlefield[i][1]
        this.playerCards[i].classList.add("animation")
       }
       for(let i =0;i<enemyCards.length;i++){
        this.enemyCards[i].querySelector(".defence").innerText = enemyBattlefield[i][1]
       
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
           if(enemyField.querySelectorAll(".card").length == 0){
            new Game(2)
           }
       },800)
      
    }

    
}

let newGame = new Game(1)

