import Card from "./Card.js"

const GAME = document.querySelector(".game")
const enemyField = GAME.querySelector('.enemy-field')
const playerField = GAME.querySelector('.player-field')
const playerHand =  GAME.querySelector('.field.player-hand')
const generateCard = GAME.querySelector(".generate-card")
const battle = GAME.querySelector(".start-battle")
const mana = GAME.querySelector(".mana")
const chooseField = GAME.querySelector(".choose-card")
const endSelect = GAME.querySelector(".end-select")

class Game{
    constructor(mana,level){
        this.level = level
        this.mana = mana
        this.currentlevel = []
        this.enemyCards = null
        this.enemyCardObjects = []
        this.playerCardObjects = []
        this.playerTokenObjects = []
        this.playerCards = null
        this.cardIndex = 0
        this.battleCry = 0
        this.levelCeck()
        this.eventListeners()
        this.console()
    }
    console(){
    }
    eventListeners(){
        let gameClass = this
        
        generateCard.addEventListener("click", function(){
            gameClass.createPlayerCard()
        })
        
        battle.addEventListener("click", function(){
            gameClass.battle()
        })
        endSelect.addEventListener("click", function(){
            gameClass.endSelect()
        })
    }

    levelCeck(){
        if(this.level === 1){
            this.createEnemyCard(1)
            this.setMana(1)
        }
        if(this.level === 2){
            this.mana = 2
            this.createEnemyCard(2)
            this.setMana(2)
        }
        if(this.level === 3){
            this.mana = 3
            this.createEnemyCard(3)
            this.setMana(3)
        }
        if(this.level === 4){
            this.mana = 4
            this.createEnemyCard(4)
            this.setMana(4)
        }
        if(this.level === 5){
            this.mana = 5
            this.createEnemyCard(5)
            this.setMana(5)
        }
        if(this.level === 6){
            this.mana = 6
            this.createEnemyCard(6)
            this.setMana(6)
        }
        if(this.level === 7){
            this.mana = 7
            this.createEnemyCard(7)
            this.setMana(7)
        }
    }
    setMana(num){
        mana.innerText = "mana: " + num
    }
    createPlayerCard(){
        if(this.mana>0){
            new Card(1,3, chooseField, true, GAME, this, 1)
            this.mana--
            mana.innerText = "mana: " + this.mana
        }
    }

    createEnemyCard(number){
        if(number == 1){
            this.enemyCardObjects.push(new Card(2,2,enemyField, false, GAME, this, 2))
        }
        if(number == 2){
            this.enemyCardObjects.push(new Card(4,4,enemyField, false, GAME, this, 2))
        }
        if(number == 3){
            this.enemyCardObjects.push(new Card(6,6,enemyField, false, GAME, this, 2))
        }
        if(number == 4){
            this.enemyCardObjects.push(new Card(8,8,enemyField, false, GAME, this, 2))
        }
        if(number == 5){
            this.enemyCardObjects.push(new Card(10,10,enemyField, false, GAME, this, 2))
        }
        if(number == 6){
            this.enemyCardObjects.push(new Card(12,12,enemyField, false, GAME, this, 2))
        }
        
    }
    battle(){
        let playerBattlefield = []
        let enemyBattlefield = []
        this.playerCards = playerField.querySelectorAll(".card")
        this.enemyCards = enemyField.querySelectorAll(".card")
        let playerCards = this.playerCards
        let enemyCards = this.enemyCards
// Player Field to array****************
       for(let i =0;i<this.playerCards.length;i++){
        playerBattlefield.push([this.playerCards[i].querySelector(".attack").innerText, this.playerCards[i].querySelector(".defence").innerText])
        if(this.playerCards[i].classList.contains("shield")){
            playerBattlefield[i].push(1)
            this.playerCards[i].classList.remove("shield")
        }
       }
       console.log(playerBattlefield)
// **********************
// Enemy Field to array****************
       console.log(playerCards);
       
       for(let i=0;i<this.enemyCards.length;i++){
        enemyBattlefield.push([this.enemyCards[i].querySelector(".attack").innerText, this.enemyCards[i].querySelector(".defence").innerText])
       }
// **********************
       for(let i =0; i< playerBattlefield.length;i++){
           for(let j = 0;j< enemyBattlefield.length;j++){
               let battleStartPlayerHealth = playerBattlefield[i][1]
               let battleStartEnemyHealth = enemyBattlefield[j][1]
               
               
               if(battleStartPlayerHealth > 0 && battleStartEnemyHealth>0){

                if(playerBattlefield[i][2] === 1){
                    playerBattlefield[i][1] = parseInt(playerBattlefield[i][1], 10) + parseInt(enemyBattlefield[j][0], 10)
                    console.log(playerBattlefield[i][2])
                    playerBattlefield[i][2] = 0
                    console.log(playerBattlefield[i][2])
                }   

              playerBattlefield[i][1] = parseInt(playerBattlefield[i][1], 10) - parseInt(enemyBattlefield[j][0], 10)
              enemyBattlefield[j][1] = parseInt(enemyBattlefield[j][1], 10) - parseInt(playerBattlefield[i][0], 10)
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
       setTimeout(()=>{
           for(let i =0;i<this.playerCardObjects.length;i++){
               if(this.playerCardObjects[i].HTML.querySelector(".stat-box.defence").innerText <=0){
                this.playerCardObjects.splice(i,1)
               }
           }
            for(let i =0;i<playerCards.length;i++){
            if(this.playerCards[i].classList.contains("animation")){
                this.playerCards[i].classList.remove("animation")
            }
            // console.log(this.playerCards[i])
                if(playerCards[i].querySelector(".defence").innerText <=0){
                   playerCards[i].remove()
                }
           }
            for(let i =0;i<enemyCards.length;i++){
                if(enemyCards[i].querySelector(".defence").innerText <=0){
                    enemyCards[i].remove()
                 }
           }
         
           
           if(enemyField.querySelectorAll(".card").length == 0){
            this.level++
            this.levelCeck()
           }else if (enemyField.querySelectorAll(".card").length !== 0 && playerField.querySelectorAll(".card").length !== 0)(
               this.battle()
           )

       },800)
      
    }
    endSelect(){ 
        chooseField.classList.toggle("hidden")
    }
    
}

let newGame = new Game(1,1)

