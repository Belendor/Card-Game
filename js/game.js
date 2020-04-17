import Card from "./Card.js"

const GAME = document.querySelector(".game")
const enemyField = GAME.querySelector('.enemy-field')
const playerField = GAME.querySelector('.player-field')
const playerHand =  GAME.querySelector('.field.player-hand')
const chooseField = GAME.querySelector(".choose-card")

const lostScreen = document.querySelector(".lost-screen")

const chooseCardScreen = document.querySelector(".choose-card")
const cardSelectText = document.querySelector(".choose-one")
const turnCounter = document.querySelector(".turn-counter")
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
    constructor(level,playerCount){
        this.level = level
        this.playerCount = playerCount
        this.playerTurn = true
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
        console.log("button events added");
        
        // generateCard.addEventListener("click",()=>{
        //     this.createPlayerCard()
        // })
        
        battle.addEventListener("click", ()=>{
            if(this.playerTurn){
                this.playerTurn = false
                this.levelCeck()
            }else{
                this.battle()
            }
        })
        lostScreen.addEventListener("click", ()=>{
            location.reload()
        })
    }

    levelCeck(){
        console.log("First Level check");
        
        if(document.querySelector(".choose-card").classList.contains("hidden")){
            document.querySelector(".choose-card").classList.remove("hidden")
        }
        if(this.playerCount === 1){
            this.createEnemyCard(this.level)
            this.setMana(this.level)
            this.createPlayerCard()
            this.cardIndexToAttack = 0
            battle.innerText = "Battle"
        }
        console.log("player Count:", this.playerCount)
        if(this.playerCount === 2){
            if(this.playerTurn){
                battle.innerText = "End Turn"
                cardSelectText.innerText = "First Player Select yor Card"
                turnCounter.innerText = `Turn: ${this.level}`
                console.log("setting player one cards")
                this.setMana(this.level)
                this.createPlayerCard(true)
                this.cardIndexToAttack = 0
            }else{
                console.log("seting cards for second player")
                cardSelectText.innerText = "Second Player Select yor Card"
                turnCounter.innerText = `Turn: ${this.level}`
                this.setMana(this.level)
                this.createPlayerCard(false)
                this.cardIndexToAttack = 0
                battle.innerText = "Battle"
            }
        }
    }

    setMana(num){
        // mana.innerHTML =   `Gold: <span style="color: #DAA520; font-size: 30px;">${num}</span>`
        this.mana = num;
    }

    createPlayerCard(playerTurn){
        console.log("setting cards for first player", playerTurn);
        console.log(this, playerTurn);
       
        if(playerTurn){
            slot1.innerHTML = ""
            slot2.innerHTML = ""
            slot3.innerHTML = ""
            slot4.innerHTML = ""
            console.log("Generating card1");
            new Card(1,3, slot1, true, GAME, this, 1, true)
            console.log("Generating card2");
            new Card(1,3, slot2, true, GAME, this, 1, true)
            console.log("Generating card3");
            new Card(1,3, slot3, true, GAME, this, 1, true)
            console.log("Generating card4");
            new Card(1,3, slot4, true, GAME, this, 1, true)
        }else{
            slot1.innerHTML = ""
            slot2.innerHTML = ""
            slot3.innerHTML = ""
            slot4.innerHTML = ""
            new Card(1,3, slot1, true, GAME, this, 1, false)
            new Card(1,3, slot2, true, GAME, this, 1, false)
            new Card(1,3, slot3, true, GAME, this, 1, false)
            new Card(1,3, slot4, true, GAME, this, 1, false)
        }

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

            if(this.enemyCards[i].classList.contains("shield")){
                enemyBattlefield[i].push(1)
            }
       }
        // ************************************

        let randomEnemy = Math.floor(Math.random()*enemyBattlefield.length)

        // Jei yra Shield**********************
        if(playerBattlefield[this.cardIndexToAttack] != undefined){
            if(playerBattlefield[this.cardIndexToAttack][2] === 1){
                
                playerBattlefield[this.cardIndexToAttack][1] = parseInt(playerBattlefield[this.cardIndexToAttack][1],10) + parseInt(enemyBattlefield[randomEnemy][0],10)
                
                this.playerCards[this.cardIndexToAttack].classList.remove("shield")
                playerBattlefield[this.cardIndexToAttack][2] = 0
            }
        }
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
        
        
        if(this.enemyCards[randomEnemy].querySelector(".defence").innerText != enemyBattlefield[randomEnemy][1]){
            this.enemyCards[randomEnemy].querySelector(".defence.stat-box").classList.add("red-text")
        }
        this.enemyCards[randomEnemy].querySelector(".defence").innerText = enemyBattlefield[randomEnemy][1]


        this.enemyCards[randomEnemy].classList.add("hit-animation")
        
         //    ********Deathrattle*************
        console.log("korta kuria tikrinam:", this.playerCards[this.cardIndexToAttack] ,"arr reikia deathrattle, mires?:", this.playerCards[this.cardIndexToAttack].querySelector(".defence").innerText, "turi drathrattle  klase:", this.playerCards[this.cardIndexToAttack].classList.contains("deathrattle"), "turi pridet shield klase:", this.playerCards[this.cardIndexToAttack].classList.contains("addShield"));
        
        if(this.playerCards[this.cardIndexToAttack].querySelector(".defence").innerText <=0 &&
        this.playerCards[this.cardIndexToAttack].classList.contains("deathrattle") && 
        this.playerCards[this.cardIndexToAttack].classList.contains("addShield")){
              console.log("toliau tikrinam ar kortu ilgis yra didesnis uz 1", playerField.querySelectorAll(".card").length);
              
            if(playerField.querySelectorAll(".card").length > 1){
                console.log("paleidziamas funkcija uzmest random skyda");

                this.addShield(playerField.querySelectorAll(".card").length, this.cardIndexToAttack, this.playerCards)
            }
        }
        console.log("arr reikia det kazkam skyda?", this.enemyCards[randomEnemy].querySelector(".defence").innerText, this.enemyCards[randomEnemy].classList.contains("deathrattle"),this.enemyCards[randomEnemy].classList.contains("addShield"))
        if(this.enemyCards[randomEnemy].querySelector(".defence").innerText <=0 &&
        this.enemyCards[randomEnemy].classList.contains("deathrattle") && 
        this.enemyCards[randomEnemy].classList.contains("addShield")){
              
            if(enemyField.querySelectorAll(".card").length > 1){
                console.log("paleidziamas funkcija uzmest random skyda ant prieso");

                this.addShield(enemyField.querySelectorAll(".card").length, randomEnemy, this.enemyCards)
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

        // this.checkLost()    
        console.log(enemyField.querySelectorAll(".card").length, "enemy field left");
        console.log(playerField.querySelectorAll(".card").length, "player field left");
        
        if(enemyField.querySelectorAll(".card").length == 0 || playerField.querySelectorAll(".card").length == 0 ){
        this.level++
        this.playerTurn = true
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
    addShield(ilgis, indexas, zaidejas){
        console.log("dedamas skydas ant random");

        let randomindex = Math.floor(Math.random()*ilgis)
        console.log("random index ant kurio det yra", randomindex);

            if(randomindex != indexas){
                console.log("korta su tokiu index gauna skyda", randomindex);
                zaidejas[randomindex].classList.add("shield")
            }else{
                console.log(randomindex, "pasirinktas random skaicius yra lygus puolikui", indexas)
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

let newGame = new Game(1,2)

