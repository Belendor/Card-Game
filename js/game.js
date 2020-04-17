import Card from "./Card.js"

const GAME = document.querySelector(".game")
const enemyField = GAME.querySelector('.enemy-field')
const playerField = GAME.querySelector('.player-field')
const playerHand =  GAME.querySelector('.field.player-hand')
const chooseField = GAME.querySelector(".choose-card")

const lostScreen = document.querySelector(".lost-screen")

const chooseCardScreen = document.querySelector(".choose-card")
// ******Coose card slots*******
const slot1 = document.querySelector(".slot.first")
const slot2 = document.querySelector(".slot.second")
const slot3 = document.querySelector(".slot.third")
const slot4 = document.querySelector(".slot.fourth")
// ******Changable HTML elements*******
const mana = document.querySelector(".mana")
// ******Buttons*******
// const toggleShop = GAME.querySelector(".end-select")
const battle = document.querySelector(".start-battle")
const generateCard = document.querySelector(".generate-card")



class Game{
    constructor(level){
        this.level = level
        this.mana = null
        this.playerCards = null
        this.enemyCards = null
        this.playerCardObjects = []
        this.playerTokenObjects = []
        this.enemyCardObjects = []
        this.cardIndex = 0
        this.battleCry = 0
        this.cardIndexToAttack = 0
        this.levelCeck()
        this.eventListeners()
        this.createPlayerCard()
    }
    cardsLeftToChoose(){
        setTimeout(()=>{
            if(this.level === 1){
                if(chooseCardScreen.querySelectorAll(".card").length == 3){
                    chooseCardScreen.classList.add("hidden")
                }
            }
            if(this.level === 2){
                if(chooseCardScreen.querySelectorAll(".card").length == 2){
                    chooseCardScreen.classList.add("hidden")
                }
            }
            if(this.level === 3){
                if(chooseCardScreen.querySelectorAll(".card").length == 1){
                    chooseCardScreen.classList.add("hidden")
                }
            }
            if(this.level === 4){
                if(chooseCardScreen.querySelectorAll(".card").length == 0){
                    chooseCardScreen.classList.add("hidden")
                }
            }
        },10)
    }
    eventListeners(){
        // generateCard.addEventListener("click",()=>{
        //     this.createPlayerCard()
        // })
        
        battle.addEventListener("click", ()=>{
            this.battle()
        })
        lostScreen.addEventListener("click", ()=>{
            location.reload()
        })
    }

    levelCeck(){
        if(document.querySelector(".choose-card").classList.contains("hidden")){
            document.querySelector(".choose-card").classList.remove("hidden")
        }

        if(this.level > 0 && this.level < 8){
            this.createEnemyCard(this.level)
            this.setMana(this.level)
            this.createPlayerCard()
            this.cardIndexToAttack = 0
          }
    }

    setMana(num){
        // mana.innerHTML =   `Gold: <span style="color: #DAA520; font-size: 30px;">${num}</span>`
        this.mana = num;
    }

    createPlayerCard(){
        slot1.innerHTML = ""
        slot2.innerHTML = ""
        slot3.innerHTML = ""
        slot4.innerHTML = ""
        new Card(1,3, slot1, true, GAME, this, 1)
        new Card(1,3, slot2, true, GAME, this, 1)
        new Card(1,3, slot3, true, GAME, this, 1)
        new Card(1,3, slot4, true, GAME, this, 1)
        // if(this.mana>0){
        //     new Card(1,3, playerHand, true, GAME, this, 1)
        //     this.mana--
        //     mana.innerHTML = `Gold: <span style="color: #DAA520; font-size: 30px;">${this.mana}</span>`
        // }else{
        //     generateCard.innerHTML = `Not enough GOLD!`
        //     setTimeout(function(){
        //         generateCard.innerText = "Generate card"
        //     },1000)
        // }
    }

    createEnemyCard(number){
        if(number == 1){
            this.enemyCardObjects.push(new Card(2,2,enemyField, false, GAME, this, 12))
        }
        if(number == 2){
            this.enemyCardObjects.push(new Card(4,4,enemyField, false, GAME, this, 13))
        }
        if(number == 3){
            this.enemyCardObjects.push(new Card(4,4,enemyField, false, GAME, this, 13))
            this.enemyCardObjects.push(new Card(4,4,enemyField, false, GAME, this, 13))
        }
        if(number == 4){
            this.enemyCardObjects.push(new Card(8,8,enemyField, false, GAME, this, 14))
            this.enemyCardObjects.push(new Card(8,8,enemyField, false, GAME, this, 14))
            this.enemyCardObjects.push(new Card(2,2,enemyField, false, GAME, this, 12))
        }
        if(number == 5){
            this.enemyCardObjects.push(new Card(10,10,enemyField, false, GAME, this, 11))
        }
        if(number == 6){
            this.enemyCardObjects.push(new Card(12,12,enemyField, false, GAME, this, 11))
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
            }
       }
        // ************************************
        // Enemy Field to array****************   
       for(let i=0;i<this.enemyCards.length;i++){
        enemyBattlefield.push([this.enemyCards[i].querySelector(".attack").innerText, this.enemyCards[i].querySelector(".defence").innerText])
       }
        // ************************************

        let randomEnemy = Math.floor(Math.random()*enemyBattlefield.length)

        // Jei yra Shield**********************
        if(playerBattlefield[this.cardIndexToAttack] != undefined){
        if(playerBattlefield[this.cardIndexToAttack][2] === 1){
            
            playerBattlefield[this.cardIndexToAttack][1] = parseInt(playerBattlefield[this.cardIndexToAttack][1],10) + parseInt(enemyBattlefield[randomEnemy][0],10)
            
            this.playerCards[this.cardIndexToAttack].classList.remove("shield")
            playerBattlefield[this.cardIndexToAttack][2] = 0
        }}
        // ************************************
        playerBattlefield[this.cardIndexToAttack][1] = playerBattlefield[this.cardIndexToAttack][1] - enemyBattlefield[randomEnemy][0]
        enemyBattlefield[randomEnemy][1] = enemyBattlefield[randomEnemy][1] - playerBattlefield[this.cardIndexToAttack][0]
        this.playerCards[this.cardIndexToAttack].classList.add("animation")
       
       
        
        console.log(this.playerCards[this.cardIndexToAttack].querySelector(".defence").innerText, playerBattlefield[this.cardIndexToAttack][1])
        console.log(this.playerCards[this.cardIndexToAttack].querySelector(".defence").innerText == playerBattlefield[this.cardIndexToAttack][1])
        if(this.playerCards[this.cardIndexToAttack].querySelector(".defence").innerText != playerBattlefield[this.cardIndexToAttack][1]){
            this.playerCards[this.cardIndexToAttack].querySelector(".defence.stat-box").classList.add("red-text")
        }
        this.playerCards[this.cardIndexToAttack].querySelector(".defence").innerText = playerBattlefield[this.cardIndexToAttack][1]
        this.enemyCards[randomEnemy].querySelector(".defence").innerText = enemyBattlefield[randomEnemy][1]
        this.enemyCards[randomEnemy].querySelector(".defence.stat-box").classList.add("red-text")
        this.enemyCards[randomEnemy].classList.add("hit-animation")
        
         //    ********Deathrattle*************
       
        if(this.playerCards[this.cardIndexToAttack].querySelector(".defence").innerText <=0 &&
        this.playerCards[this.cardIndexToAttack].classList.contains("deathrattle") && 
        this.playerCards[this.cardIndexToAttack].classList.contains("addShield")){
              
            if(playerField.querySelectorAll(".card").length > 0){
                if(this.cardIndexToAttack+1 < playerField.querySelectorAll(".card").length){
                 
                this.addShield(playerField.querySelectorAll(".card").length, this.cardIndexToAttack)

                }
            }
        }

       setTimeout(()=>{
        if(this.enemyCards[randomEnemy].classList.contains("hit-animation")){
            this.enemyCards[randomEnemy].classList.remove("hit-animation")
        }
        
        this.playerCards[this.cardIndexToAttack].classList.remove("animation")
       
        if(this.playerCards[this.cardIndexToAttack].querySelector(".defence").innerText <= 0){
            this.playerCards[this.cardIndexToAttack].remove()
            if(this.cardIndexToAttack == playerField.querySelectorAll(".card").length && this.cardIndexToAttack>0){
                this.cardIndexToAttack = 0
            }
        }else{
            if(playerField.querySelectorAll(".card").length > 0){
                console.log(playerField.querySelectorAll(".card").length-1, this.cardIndexToAttack);
                
                if(playerField.querySelectorAll(".card").length-1 <= this.cardIndexToAttack){
                    this.cardIndexToAttack = 0
                }else{

                    this.cardIndexToAttack++
                    console.log(this.cardIndexToAttack)
                }
            }
        }

        if(this.enemyCards[randomEnemy].querySelector(".defence").innerText <= 0){
            this.enemyCards[randomEnemy].remove()
        }

        this.checkLost()    
        
        if(enemyField.querySelectorAll(".card").length == 0){
        this.level++
        this.levelCeck()
        }else if (enemyField.querySelectorAll(".card").length !== 0 && playerField.querySelectorAll(".card").length !== 0)(
            this.battle()
        )
      
        },1500)

        }
    // endSelect(){ 
    //     chooseField.classList.toggle("hidden")
    //     if(chooseField.classList.contains("hidden")){
    //         toggleShop.innerHTML = `Show <span style="font-weight: bold;">Shop</span>`
    //     }else{
    //         toggleShop.innerHTML = `Hide <span style="font-weight: bold;">Shop</span>`
    //     }
    // }
    addShield(ilgis, indexas){
        let randomindex = Math.floor(Math.random()*ilgis)
        if(randomindex != indexas){
            this.playerCards[randomindex].classList.add("shield")
        }else{
            this.addShield(ilgis, indexas) 
        }
    }
    checkLost(){
        let cardsLefinHand = playerHand.querySelectorAll(".card")
        let cardsLefinBattlefield = playerField.querySelectorAll(".card")
        let cardsleftinenemyField = enemyField.querySelectorAll(".card")
            
            console.log(cardsLefinHand, cardsLefinBattlefield, cardsleftinenemyField.length, "ckecing lost");
            if(cardsleftinenemyField.length >0 && 
                cardsLefinHand.length <= 0&&
                cardsLefinBattlefield.length <= 0){
                    let textField = lostScreen.querySelector(".defeat-text")
                    lostScreen.classList.remove("hidden")
                    textField.innerText = `Level reached: ${this.level}`
                    console.log("Defeat");
                } 
        
    }
}

let newGame = new Game(1)

