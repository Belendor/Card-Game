import Card from "./Card.js"

const GAME = document.querySelector(".game")
const enemyField = GAME.querySelector('.enemy-field')
const playerField = GAME.querySelector('.player-field')
let playerHand =  GAME.querySelector('.field.player-hand')

const lostScreen = document.querySelector(".lost-screen")

const chooseCardScreen = document.querySelector(".choose-card")
const cardSelectText = document.querySelector(".choose-one")
const turnCounter = document.querySelector(".turn-counter")

// ******Coose card slots*******
const slot1 = document.querySelector(".slot.first")
const slot2 = document.querySelector(".slot.second")
const slot3 = document.querySelector(".slot.third")
const slot4 = document.querySelector(".slot.fourth")

// ******Buttons*******
const battle = document.querySelector(".start-battle")


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
        this.enemyIndexToAttack = 0
        this.playerTurnToAttack = true
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
            if(this.level >= 4){
                if(chooseCardScreen.querySelectorAll(".card").length == 0){
                    chooseCardScreen.classList.add("hidden")
                }
            }
        },5)
    }

    disableOponentCards(fieldToDissable){
            let visosKortos = fieldToDissable.querySelectorAll(".card")
            for(let i=0;i<visosKortos.length;i++){
                visosKortos[i].setAttribute("draggable","false")
            }
    }
    enableOppenentCards(fieldToEnable){
        let visosKortos = fieldToEnable.querySelectorAll(".card")
        for(let i=0;i<visosKortos.length;i++){
            visosKortos[i].setAttribute("draggable","true")
        }
    }

    eventListeners(){
        battle.addEventListener("click", ()=>{
            if(this.playerTurn){
                this.playerTurn = false
                this.levelCeck()
                this.disableOponentCards(playerField)
                this.enableOppenentCards(enemyField)
            }else{
                let playerCards = playerField.querySelectorAll(".card").length
                let enemyCards = enemyField.querySelectorAll(".card").length
                let bendrasSkaicius = enemyCards+playerCards
 
                if( bendrasSkaicius >0 && chooseCardScreen.classList.contains("hidden") ){
                    this.battle(this.playerTurnToAttack)
                    this.disableOponentCards(enemyField)
                    this.enableOppenentCards(playerField)
                }else{
                    alert("Laukas tuscias, nera kam kovoti, arba dar nepasirinkot visos kortos")
                }
            }
        })
        lostScreen.addEventListener("click", ()=>{
            location.reload()
        })
    }

    levelCeck(){  
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
        if(this.playerCount === 2){
            if(this.playerTurn){
                battle.innerText = "End Turn"
                turnCounter.innerText = `Turn: ${this.level}`
                this.setMana(this.level)
                this.createPlayerCard(true)
                this.cardIndexToAttack = 0
                if(this.level == 1){
                    cardSelectText.innerText = "First Player Select yor Card"
                }
                if(this.level >1 && this.level <5){
                    cardSelectText.innerText = `First Player Select ${this.level} Cards`
                }
                if(this.level > 4){
                    cardSelectText.innerText = `First Player Select 4 Cards`
                }

            }else{
                turnCounter.innerText = `Turn: ${this.level}`
                this.setMana(this.level)
                this.createPlayerCard(false)
                this.cardIndexToAttack = 0
                battle.innerText = "Battle"

                if(this.level == 1){
                    cardSelectText.innerText = "Second Player Select yor Card"
                }
                if(this.level >1 && this.level <5){
                    cardSelectText.innerText = `Second Player Select ${this.level} Cards`
                }
                if(this.level > 4){
                    cardSelectText.innerText = `Second Player Select 4 Cards`
                }
            }
        }
    }

    setMana(num){
        this.mana = num;
    }

    createPlayerCard(playerTurn){
        if(playerTurn){
            playerHand.innerHTML = ""
            slot1.innerHTML = ""
            slot2.innerHTML = ""
            slot3.innerHTML = ""
            slot4.innerHTML = ""
            new Card(1,3, slot1, true, GAME, this, 1, true)
            new Card(1,3, slot2, true, GAME, this, 1, true)
            new Card(1,3, slot3, true, GAME, this, 1, true)
            new Card(1,3, slot4, true, GAME, this, 1, true)
        }else{
            playerHand.innerHTML = ""
            slot1.innerHTML = ""
            slot2.innerHTML = ""
            slot3.innerHTML = ""
            slot4.innerHTML = ""
            new Card(1,3, slot1, true, GAME, this, 1, false)
            new Card(1,3, slot2, true, GAME, this, 1, false)
            new Card(1,3, slot3, true, GAME, this, 1, false)
            new Card(1,3, slot4, true, GAME, this, 1, false)
        }
    }


    battle(firstPlayerAttacks){
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
        let randomDefending = null

        if(firstPlayerAttacks){ 
            randomDefending = this.tauntCheck( this.enemyCards )
        }else{
            randomDefending = this.tauntCheck( this.playerCards )
        }


        if(enemyBattlefield.length !== 0 && playerBattlefield.length !==0){
            if(firstPlayerAttacks){

                if(this.cardIndexToAttack >= playerField.querySelectorAll(".card").length){
                    this.cardIndexToAttack--
                }else if(playerField.length <=1 || this.cardIndexToAttack < 0 ){
                    this.cardIndexToAttack = 0
                }

                // ********Shield**********************
                this.ckeckForShield(playerBattlefield[this.cardIndexToAttack], enemyBattlefield[randomDefending], this.playerCards[this.cardIndexToAttack])
                this.ckeckForShield(enemyBattlefield[randomDefending], playerBattlefield[this.cardIndexToAttack], this.enemyCards[randomDefending])
                // ************************************

                playerBattlefield[this.cardIndexToAttack][1] = playerBattlefield[this.cardIndexToAttack][1] - enemyBattlefield[randomDefending][0]
                enemyBattlefield[randomDefending][1] = enemyBattlefield[randomDefending][1] - playerBattlefield[this.cardIndexToAttack][0]
                this.playerCards[this.cardIndexToAttack].classList.add("animation")
               
                if(this.playerCards[this.cardIndexToAttack].querySelector(".defence").innerText != playerBattlefield[this.cardIndexToAttack][1]){
                    this.playerCards[this.cardIndexToAttack].querySelector(".defence").classList.remove("green-text")
                    this.playerCards[this.cardIndexToAttack].querySelector(".defence.stat-box").classList.add("red-text")
                    this.playerCards[this.cardIndexToAttack].querySelector(".class-box").innerText =  playerBattlefield[this.cardIndexToAttack][1] - parseInt(this.playerCards[this.cardIndexToAttack].querySelector(".defence").innerText,10)
                    this.playerCards[this.cardIndexToAttack].querySelector(".class-box").classList.add("hit")
                    setTimeout(()=> {this.playerCards[this.cardIndexToAttack].querySelector(".class-box").classList.remove("hit")
                                    this.playerCards[this.cardIndexToAttack].querySelector(".class-box").innerText = ""},1900)
                }
                this.playerCards[this.cardIndexToAttack].querySelector(".defence").innerText = playerBattlefield[this.cardIndexToAttack][1]
                
                
                if(this.enemyCards[randomDefending].querySelector(".defence").innerText != enemyBattlefield[randomDefending][1]){
                    this.enemyCards[randomDefending].querySelector(".defence").classList.remove("green-text")
                    this.enemyCards[randomDefending].querySelector(".defence.stat-box").classList.add("red-text")
                    this.enemyCards[randomDefending].querySelector(".class-box").innerText =  enemyBattlefield[randomDefending][1] - parseInt(this.enemyCards[randomDefending].querySelector(".defence").innerText,10) 
                    this.enemyCards[randomDefending].querySelector(".class-box").classList.add("hit")
                    setTimeout(()=> {this.enemyCards[randomDefending].querySelector(".class-box").classList.remove("hit")
                                    this.enemyCards[randomDefending].querySelector(".class-box").innerText = "" },1900)
                }
                this.enemyCards[randomDefending].querySelector(".defence").innerText = enemyBattlefield[randomDefending][1]
        
        
                this.enemyCards[randomDefending].classList.add("hit-animation")
                
                 //    ********Deathrattle*************
                this.checkDeathrattle(this.playerCards[this.cardIndexToAttack], this.cardIndexToAttack, playerField, this.playerCards)
                this.checkDeathrattle(this.enemyCards[randomDefending], randomDefending, enemyField, this.enemyCards)
                //    *********************************
                 //    ********Deal 1 DMG to ALL********
                this.deal1DmmgAll(this.playerCards[this.cardIndexToAttack])
                this.deal1DmmgAll(this.enemyCards[randomDefending])
                //    *********************************
                 //    ********Fives +1/+1 to friendly********
                this.gives1a1d(this.playerCards[this.cardIndexToAttack], this.playerCards)
                this.gives1a1d(this.enemyCards[randomDefending], this.enemyCards)
                //    *********************************
            }else{

                if(this.enemyIndexToAttack >= enemyField.querySelectorAll(".card").length){
                    this.enemyIndexToAttack--
                }else if(enemyField.length <=1 || this.enemyIndexToAttack < 0 ){
                    this.enemyIndexToAttack = 0
                }
                
                // ********Shield**********************
                this.ckeckForShield(playerBattlefield[randomDefending], enemyBattlefield[this.enemyIndexToAttack], this.playerCards[randomDefending])
                this.ckeckForShield(enemyBattlefield[this.enemyIndexToAttack], playerBattlefield[randomDefending], this.enemyCards[this.enemyIndexToAttack])
                // ************************************

                playerBattlefield[randomDefending][1] = playerBattlefield[randomDefending][1] - enemyBattlefield[this.enemyIndexToAttack][0]
                enemyBattlefield[this.enemyIndexToAttack][1] = enemyBattlefield[this.enemyIndexToAttack][1] - playerBattlefield[randomDefending][0]

                this.enemyCards[this.enemyIndexToAttack].classList.add("animationReverse")
   
                if(this.playerCards[randomDefending].querySelector(".defence").innerText != playerBattlefield[randomDefending][1]){
                    this.playerCards[randomDefending].querySelector(".defence").classList.remove("green-text")
                    this.playerCards[randomDefending].querySelector(".defence.stat-box").classList.add("red-text")
                    this.playerCards[randomDefending].querySelector(".class-box").innerText =  playerBattlefield[randomDefending][1] - parseInt(this.playerCards[randomDefending].querySelector(".defence").innerText,10) 
                    this.playerCards[randomDefending].querySelector(".class-box").classList.add("hit")
                    setTimeout(()=> {this.playerCards[randomDefending].querySelector(".class-box").classList.remove("hit")
                                    this.playerCards[randomDefending].querySelector(".class-box").innerText = "" },1900)
                }
                
                this.playerCards[randomDefending].querySelector(".defence").innerText = playerBattlefield[randomDefending][1]
                
                
                if(this.enemyCards[this.enemyIndexToAttack].querySelector(".defence").innerText != enemyBattlefield[this.enemyIndexToAttack][1]){
                    this.enemyCards[this.enemyIndexToAttack].querySelector(".defence").classList.remove("green-text")
                    this.enemyCards[this.enemyIndexToAttack].querySelector(".defence.stat-box").classList.add("red-text")
                    this.enemyCards[this.enemyIndexToAttack].querySelector(".class-box").innerText =  enemyBattlefield[this.enemyIndexToAttack][1] - parseInt(this.enemyCards[this.enemyIndexToAttack].querySelector(".defence").innerText,10) 
                    this.enemyCards[this.enemyIndexToAttack].querySelector(".class-box").classList.add("hit")
                    setTimeout(()=> {this.enemyCards[this.enemyIndexToAttack].querySelector(".class-box").classList.remove("hit")
                                    this.enemyCards[this.enemyIndexToAttack].querySelector(".class-box").innerText = "" },1900)
                }

                this.enemyCards[this.enemyIndexToAttack].querySelector(".defence").innerText = enemyBattlefield[this.enemyIndexToAttack][1]
        
        
                this.playerCards[randomDefending].classList.add("hit-animation")
                
                 //    ********Deathrattle*************
                this.checkDeathrattle(this.playerCards[randomDefending], randomDefending, playerField, this.playerCards)
                this.checkDeathrattle(this.enemyCards[this.enemyIndexToAttack], this.enemyIndexToAttack, enemyField, this.enemyCards)
                // ***********************************
                //    ********Deal 1 DMG to ALL********
                this.deal1DmmgAll(this.playerCards[randomDefending])
                this.deal1DmmgAll(this.enemyCards[this.enemyIndexToAttack])
                //    *********************************
                //    ********Fives +1/+1 to friendly********
                this.gives1a1d(this.playerCards[randomDefending], this.playerCards)
                this.gives1a1d(this.enemyCards[this.enemyIndexToAttack], this.enemyCards)
                //    *********************************
            }
        }

        this.checkWhoWon(playerField, enemyField)

       setTimeout(()=>{
        if(firstPlayerAttacks){
            if(enemyBattlefield.length !== 0 && playerBattlefield.length !==0){

                if(this.enemyCards[randomDefending].classList.contains("hit-animation")){
                    this.enemyCards[randomDefending].classList.remove("hit-animation")
                }
                
                if(this.playerCards[this.cardIndexToAttack].classList.contains("animation")){
                    this.playerCards[this.cardIndexToAttack].classList.remove("animation")
                }
                
            
                if(this.playerCards[this.cardIndexToAttack].querySelector(".defence").innerText <= 0){
                    this.playerCards[this.cardIndexToAttack].remove()
                    if(this.cardIndexToAttack == playerField.querySelectorAll(".card").length && this.cardIndexToAttack > 0){
                        this.cardIndexToAttack = 0
                    }
                }else{
                    if(playerField.querySelectorAll(".card").length > 0){
                        if(playerField.querySelectorAll(".card").length-1 <= this.cardIndexToAttack){
                            this.cardIndexToAttack = 0
                        }else{
                            this.cardIndexToAttack++
                        }
                    }
                }
                
                for(let i = 0; i < this.enemyCards.length;i++){
                    if(this.enemyCards[i].querySelector(".defence").innerText <= 0){
                        this.enemyCards[i].remove()
                    }
                }
                for(let i = 0; i < this.playerCards.length;i++){
                    if(this.playerCards[i].querySelector(".defence").innerText <= 0){
                        this.playerCards[i].remove()
                    }
                }

            }
        }else{
            if(enemyBattlefield.length !== 0 && playerBattlefield.length !==0){

                if(this.playerCards[randomDefending].classList.contains("hit-animation")){
                    this.playerCards[randomDefending].classList.remove("hit-animation")
                }
                
                if(this.enemyCards[this.enemyIndexToAttack].classList.contains("animationReverse")){
                    this.enemyCards[this.enemyIndexToAttack].classList.remove("animationReverse")
                }
            
                if(this.enemyCards[this.enemyIndexToAttack].querySelector(".defence").innerText <= 0){
                    this.enemyCards[this.enemyIndexToAttack].remove()

                    if(this.enemyIndexToAttack == enemyField.querySelectorAll(".card").length && this.cardIndexToAttack > 0){
                        this.cardIndexToAttack = 0
                    }
                }else{
                    if(enemyField.querySelectorAll(".card").length > 0){
                        if(enemyField.querySelectorAll(".card").length-1 <= this.enemyIndexToAttack){
                            this.enemyIndexToAttack = 0
                        }else{
                            this.enemyIndexToAttack++
                        }
                    }
                }
        
                for(let i = 0; i < this.enemyCards.length;i++){
                    if(this.enemyCards[i].querySelector(".defence").innerText <= 0){
                        this.enemyCards[i].remove()
                    }
                }
                for(let i = 0; i < this.playerCards.length;i++){
                    if(this.playerCards[i].querySelector(".defence").innerText <= 0){
                        this.playerCards[i].remove()
                    }
                }
            }
        }


        this.checkLost()

        
            if(enemyField.querySelectorAll(".card").length == 0 || playerField.querySelectorAll(".card").length == 0 ){
                setTimeout(()=>{
                this.level++
                this.playerTurn = true
                this.playerTurnToAttack = true
                this.levelCeck()
                },1500)
            }else if (enemyField.querySelectorAll(".card").length !== 0 && playerField.querySelectorAll(".card").length !== 0){
                if(this.playerTurnToAttack ){
                    this.playerTurnToAttack = false
                    this.battle(false)
                }else{
                    this.playerTurnToAttack = true
                    this.battle(true)
                }
            }
       
        },2000)
    }
    checkWhoWon(playerField, enemyField){
        let friendlyAliveCards = []
        let enemyAliveCards = []
        let allFriendlyCards = playerField.querySelectorAll(".card")
        let allEnemyCards = enemyField.querySelectorAll(".card")

        for(let i = 0;i<allFriendlyCards.length;i++){
            if(allFriendlyCards[i].querySelector(".defence").innerText >0){
                friendlyAliveCards.push(i)
            }
        }
        for(let i = 0;i<allEnemyCards.length;i++){
            if(allEnemyCards[i].querySelector(".defence").innerText >0){
                enemyAliveCards.push(i)
            }
        }

        if(friendlyAliveCards.length == 0 && enemyAliveCards.length > 0){

            let likusiosKortos = enemyAliveCards.length
            let HealthHTML = document.querySelector(".player-health > p")
            for(let i=0; i<likusiosKortos;i++){
                let cardAttack = allEnemyCards[enemyAliveCards[i]].querySelector(".attack").innerText

                allEnemyCards[enemyAliveCards[i]].querySelector(".attack").classList.add("enemy-damage-animation")
                setTimeout(()=>{allEnemyCards[enemyAliveCards[i]].querySelector(".attack").classList.remove("enemy-damage-animation")},1000)

                HealthHTML.innerText = parseInt(HealthHTML.innerText,10) - parseInt(cardAttack,10)
                HealthHTML.classList.add("red-text")

                document.querySelector(".hp-hit-box-bottom").classList.add("hit")
                document.querySelector(".hp-hit-box-bottom").innerText = "-" + parseInt(cardAttack,10) 

                setTimeout(()=> {document.querySelector(".hp-hit-box-bottom").classList.remove("hit")
                document.querySelector(".hp-hit-box-bottom").innerText = "" },1900)
            }
        }

        if(friendlyAliveCards.length > 0 && enemyAliveCards.length == 0){

            let likusiosKortos = friendlyAliveCards.length
            let HealthHTML = document.querySelector(".enemy-health > p")
            for(let i=0; i<likusiosKortos;i++){

                let cardAttack = allFriendlyCards[friendlyAliveCards[i]].querySelector(".attack").innerText

                allFriendlyCards[friendlyAliveCards[i]].querySelector(".attack").classList.add("hero-damage-animation")
               setTimeout(()=>{allFriendlyCards[friendlyAliveCards[i]].querySelector(".attack").classList.remove("hero-damage-animation")},1000)

                HealthHTML.innerText = parseInt(HealthHTML.innerText,10) - parseInt(cardAttack,10)
                HealthHTML.classList.add("red-text")
                
                document.querySelector(".hp-hit-box-top").classList.add("hit")
                document.querySelector(".hp-hit-box-top").innerText = "-" + parseInt(cardAttack,10) 

                setTimeout(()=> {document.querySelector(".hp-hit-box-top").classList.remove("hit")
                document.querySelector(".hp-hit-box-top").innerText = "" },1900)
            }
        }
    }
    tauntCheck(battlefieldCards){
        let randomDefending = Math.floor(Math.random()*battlefieldCards.length)

        for(let i =0; i<battlefieldCards.length;i++){    
            if(battlefieldCards[i].querySelector(".card-description").classList.contains("taunt")){
                randomDefending = i
                break
            }     
        }
        return randomDefending
    }
    ckeckForShield(cardInArr, randomEnemyArr, checkedCard){
        try{
            if( cardInArr[2] === 1){
                cardInArr[1] = parseInt(cardInArr[1],10) + parseInt(randomEnemyArr[0],10)
                checkedCard.classList.remove("shield")
                cardInArr[2] = 0
            }
        }catch(err){

        }   
    }
    gives1a1d(checkedCard, checkedCardField){
        if( checkedCard.querySelector(".defence").innerText <=0 &&
            checkedCard.classList.contains("gives1a1d")){
                checkedCard.querySelector(".defence").classList.add("gives1a1de")
                checkedCard.querySelector(".defence").innerText = parseInt(checkedCard.querySelector(".defence").innerText, 10) - 1
                checkedCard.querySelector(".attack").innerText = parseInt(checkedCard.querySelector(".attack").innerText, 10) - 1
                for(let i = 0; i<checkedCardField.length; i++){
                    checkedCardField[i].querySelector(".defence").innerText = parseInt(checkedCardField[i].querySelector(".defence").innerText, 10) + 1
                    checkedCardField[i].querySelector(".defence").classList.add("green-text")
                    checkedCardField[i].querySelector(".attack").innerText = parseInt(checkedCardField[i].querySelector(".attack").innerText, 10) + 1
                    checkedCardField[i].querySelector(".attack").classList.add("green-text")
                }
            }

    }
    addShield(ilgis, indexas, zaidejas){
        let randomindex = Math.floor(Math.random()*ilgis)
        if(randomindex != indexas){
            zaidejas[randomindex].classList.add("shield")
        }else{
            this.addShield(ilgis, indexas, zaidejas) 
        }
    }
    checkDeathrattle(checkedCard, checkedCardIndex, checkedCardField, checkedFieldCards){
        if( checkedCard.querySelector(".defence").innerText <=0 &&
            checkedCard.classList.contains("deathrattle") && 
            checkedCard.classList.contains("addShield")){
            if(checkedCardField.querySelectorAll(".card").length > 1){
                this.addShield(checkedCardField.querySelectorAll(".card").length, checkedCardIndex, checkedFieldCards)
            }
        }
    }
    deal1DmmgAll(checkedCard, killedFromAoe){
        if(killedFromAoe){
            if(checkedCard.classList.contains("deal1DmgAll")){
                return
            }
        }
        if( checkedCard.querySelector(".defence").innerText <=0 &&
            checkedCard.classList.contains("deal1DmgAll")){
            checkedCard.querySelector(".defence").classList.add("aoeDmg")
            for(let i = 0; i<this.playerCards.length;i++){
                if(this.playerCards[i].classList.contains("shield")){
                    this.playerCards[i].classList.remove("shield")
                }else if(!this.playerCards[i].classList.contains("shield")){
                    this.playerCards[i].querySelector(".defence").innerText = parseInt(this.playerCards[i].querySelector(".defence").innerText, 10) - 1
                    this.playerCards[i].querySelector(".defence").classList.remove("green-text")
                    this.playerCards[i].querySelector(".defence").classList.add("red-text")
                    this.playerCards[i].querySelector(".class-box").classList.add("hit")
                    this.playerCards[i].querySelector(".class-box").innerText =  -1 

                    setTimeout(()=> {this.playerCards[i].querySelector(".class-box").classList.remove("hit")
                                    this.playerCards[i].querySelector(".class-box").innerText = "" },1500)

                    //     //    ********Deathrattle*************
                    this.checkDeathrattle(this.playerCards[i], i, playerField, this.playerCards)
                    // // ***********************************

                    //    ********Deal 1 DMG to ALL********
                    if(killedFromAoe){
                        return
                    }else{
                        this.deal1DmmgAll(this.playerCards[i], true)
                    }
                    //    *********************************

                    // //    ********Fives +1/+1 to friendly********
                    this.gives1a1d(this.playerCards[i], this.playerCards)
                    // //    *******************************

                }
            }
            
            for(let i =0; i<this.enemyCards.length;i++){
                if(this.enemyCards[i].classList.contains("shield")){
                    this.enemyCards[i].classList.remove("shield")

                }else if(!this.enemyCards[i].classList.contains("shield")){

                    this.enemyCards[i].querySelector(".defence").innerText = parseInt(this.enemyCards[i].querySelector(".defence").innerText, 10) - 1
                    this.enemyCards[i].querySelector(".defence").classList.remove("green-text")
                    this.enemyCards[i].querySelector(".defence").classList.add("red-text")
                    this.enemyCards[i].querySelector(".class-box").classList.add("hit")
                    this.enemyCards[i].querySelector(".class-box").innerText =  -1 

                    setTimeout(()=> {this.enemyCards[i].querySelector(".class-box").classList.remove("hit")
                                    this.enemyCards[i].querySelector(".class-box").innerText = "" },1500)

                    // //    ********Deathrattle*************
                    this.checkDeathrattle(this.enemyCards[i], i, enemyField, this.enemyCards)
                    // // ***********************************

                    //    ********Deal 1 DMG to ALL********
                    if(killedFromAoe){
                        return
                    }else{
                        this.deal1DmmgAll(this.enemyCards[i], true)
                    }
                    //    *********************************

                    // //    ********Fives +1/+1 to friendly********
                    this.gives1a1d(this.enemyCards[i], this.enemyCards)
                    // //    **********         

                }
            }
        }
    }
    checkLost(){

    let playerHealth = document.querySelector(".player-health > p").innerText
    let enemyHealth = document.querySelector(".enemy-health > p").innerText

    if( playerHealth <=0 || enemyHealth<=0 ){
            let textField = lostScreen.querySelector(".defeat-text")
            lostScreen.classList.remove("hidden")
            if(playerHealth<=0){
                textField.innerText = `Second player WON!`
            }
            if(enemyHealth<=0){
                textField.innerText = `First player WON!`
            }
        } 
    }
}

let newGame = new Game(1,2)

