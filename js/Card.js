import cards from "./data.js"

class Card{
    constructor(attack, defence, target, dragable, DOM, game, cardLevel){
        this.attack = attack
        this.defence = defence
        this.target = target
        this.dragable = dragable
        this.cardLevel = cardLevel;
        this.game = game;
        this.DOM = DOM;
        this.index = 0;
        this.HTML = null
        this.canSummon = false
        this.hasShield = false
        this.battleCryReduced = false
        this.generateCard()
        this.addEvents()
    }

    generateCard(){
        if(this.cardLevel === 1){

            console.log("generate card paleistas");
            
            let radomCard = Math.floor(Math.random()*3)
            let selectedCard = cards.level1[radomCard]
            this.attack = selectedCard.attack
            this.defence = selectedCard.defence
            this.canSummon = selectedCard.canSummon
            this.hasShield = selectedCard.hasShield

   
        
            let HTML = `<div class="card player" id="Nr${this.game.cardIndex}" draggable="${this.dragable}">
            <div class="card-description">${selectedCard.ability}</div>
            <div class="card-name">${selectedCard.name}</div>
            <div class="card-footer">
                <div class="stat-box attack">${selectedCard.attack}</div>
                <div class="stat-box defence">${selectedCard.defence}</div>
            </div>
            </div>`
            this.game.cardIndex++
            

            this.target.insertAdjacentHTML("beforeend", HTML )

            let id = "#Nr"+ (this.game.cardIndex - 1)
        
            this.HTML = this.target.querySelector(id)

            this.game.playerCardObjects.push(this)

            if(this.hasShield){
                this.HTML.classList.add("shield")
            }

            if(this.canSummon){
                this.game.battleCry++
                this.battleCryReduced = true
                console.log(this.game.battleCry);
            }

        }else{
            this.HTML = `<div class="card token" draggable="${this.dragable}">
            <div class="card-footer">
                <div class="stat-box attack">${this.attack}</div>
                <div class="stat-box defence">${this.defence}</div>
            </div>
            </div>`
            this.target.insertAdjacentHTML("beforeend", this.HTML )
        } 
    }

    addEvents(){
        let cards = this.game.playerCardObjects
        let tokens = this.DOM.querySelectorAll(".card.token")
        let fields = this.DOM.querySelectorAll(".field")
        let hand = this.DOM.querySelector(".field.player-hand")
        let dragedCard = ''
        
        console.log("paleidziamas event");
        
        for (let i = 0;i<cards.length;i++){
            let cardObject = cards[i]
            let card = cards[i].HTML
            console.log(card)
            card.addEventListener("dragstart", function(e){
                dragedCard = e.target
                setTimeout(function(){
                    card.classList.add("hidden")
                },0)
            })
            
            card.addEventListener("dragend", ()=>{
                setTimeout(()=>{
                    card.classList.remove("hidden")
                    // card.setAttribute("draggable", false)
                    dragedCard = ''
                },0)
            })

            for(let j = 0;j<fields.length; j++){
                let field = fields[j]
                field.addEventListener("dragover",function(e){
                    e.preventDefault()
                })
                field.addEventListener("dragenter", function(){

                })
                field.addEventListener("dragleave", function(){

                })
                field.addEventListener("drop",()=>{
                   console.log("dropped")
                   
                   if(this.game.battleCry > 0 && field.classList.contains("player-field")){
                       console.log("must summon");
                       console.log(dragedCard);
                       
                       console.log(cardObject);

                       if(cardObject.battleCryReduced){
                            cardObject.battleCryReduced = false
                            this.sumonCat()
                            if(this.canSummon){
                               this.game.battleCry--
                            }
                        }
                    }
                    field.append(dragedCard)
                })
            }     
        }

        // ******** TOKENS ********

        for (let i = 0;i<tokens.length;i++){

            let card = tokens[i]
            card.addEventListener("dragstart", function(e){
                dragedCard = e.target
                setTimeout(function(){
                    card.classList.add("hidden")
                },0)
            })
            card.addEventListener("dragend", function(e){
                setTimeout(function(){
                    card.classList.remove("hidden")
                    // card.setAttribute("draggable", false)
                    dragedCard = ''
                },0)
            })

            for(let j = 0;j<fields.length; j++){
                let field = fields[j]
                field.addEventListener("dragover",function(e){
                    e.preventDefault()
                    
                })
                field.addEventListener("dragenter", function(){

                })
                field.addEventListener("dragleave", function(){

                })
                field.addEventListener("drop",function(e){
                    this.append(dragedCard)
                })
            
            }   
            
        }
    }
    sumonCat(){
        console.log(this.canSummon);
        if(this.canSummon)
        this.game.playerTokenObjects.push(new Card(1,1, this.DOM.querySelector('.player-field'), true, this.DOM, this.game,2))
    }
}

export default Card