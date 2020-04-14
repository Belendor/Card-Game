import Card from "./Card.js"

const GAME = document.querySelector(".game")
const enemyField = GAME.querySelector('.enemy-field')
const playerField = GAME.querySelector('.player-field')
const playerHand =  GAME.querySelector('.field.player-hand')
const chooseField = GAME.querySelector(".choose-card")
const lostScreen =  document.querySelector(".lost-screen")

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
        this.console()
    }
    console(){
    }
    eventListeners(){
        generateCard.addEventListener("click",()=>{
            this.createPlayerCard()
        })
        
        battle.addEventListener("click", ()=>{
            this.battle()
        })
        // toggleShop.addEventListener("click", ()=>{
        //     this.endSelect()
        // })
    }

    levelCeck(){
        if(this.level === 1){
            this.createEnemyCard(1)
            this.setMana(1)
            this.cardIndexToAttack = 0
        }
        if(this.level === 2){
            this.mana = 2
            this.createEnemyCard(2)
            this.setMana(2)
            this.cardIndexToAttack = 0
        }
        if(this.level === 3){
            this.mana = 3
            this.createEnemyCard(3)
            this.setMana(3)
            this.cardIndexToAttack = 0
        }
        if(this.level === 4){
            this.mana = 4
            this.createEnemyCard(4)
            this.setMana(4)
            this.cardIndexToAttack = 0
        }
        if(this.level === 5){
            this.mana = 5
            this.createEnemyCard(5)
            this.setMana(5)
            this.cardIndexToAttack = 0
        }
        if(this.level === 6){
            this.mana = 6
            this.createEnemyCard(6)
            this.setMana(6)
            this.cardIndexToAttack = 0
        }
        if(this.level === 7){
            this.mana = 7
            this.createEnemyCard(7)
            this.setMana(7)
            this.cardIndexToAttack = 0
        }
    }

    setMana(num){
        mana.innerHTML =   `Gold: <span style="color: #DAA520; font-size: 30px;">${num}</span>`
        this.mana = num;
    }

    createPlayerCard(){
        if(this.mana>0){
            new Card(1,3, playerHand, true, GAME, this, 1)
            this.mana--
            mana.innerHTML = `Gold: <span style="color: #DAA520; font-size: 30px;">${this.mana}</span>`
        }else{
            generateCard.innerHTML = `Not enough GOLD!`
            setTimeout(function(){
                generateCard.innerText = "Generate card"
            },1000)
        }
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

        
        if(enemyField.querySelectorAll(".card").length == 0){
        this.level++
        this.levelCeck()
        }else if (enemyField.querySelectorAll(".card").length !== 0 && playerField.querySelectorAll(".card").length !== 0)(
            this.battle()
        )
            
        // let cardsLefinHand = playerHand.querySelectorAll(".card")
        // let cardsLefinShop = chooseField.querySelectorAll(".card")
        // console.log(cardsLefinHand, cardsLefinShop, this.mana);
        // if(this.mana == 0 && 
        //     cardsLefinHand.length <= 0&&
        //     cardsLefinShop.length <= 0){
        //         console.log("Defeat");
                
        //         lostScreen.classList.remove("hidden")
        //     }  
        },1200)

        }
    endSelect(){ 
        chooseField.classList.toggle("hidden")
        if(chooseField.classList.contains("hidden")){
            toggleShop.innerHTML = `Show <span style="font-weight: bold;">Shop</span>`
        }else{
            toggleShop.innerHTML = `Hide <span style="font-weight: bold;">Shop</span>`
        }
    }
    addShield(ilgis, indexas){
        let randomindex = Math.floor(Math.random()*ilgis)
        if(randomindex != indexas){
            this.playerCards[randomindex].classList.add("shield")
        }else{
            this.addShield(ilgis, indexas) 
        }
    }
    
}

let newGame = new Game(1)

