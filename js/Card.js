import cards from "./data.js"

class Card{
    constructor(attack, defence, target, dragable, DOM, game, cardLevel){
        this.cardLevel = cardLevel;
        this.game = game;
        this.DOM = DOM;
        this.index = 0;
        this.target = target
        this.attack = attack
        this.defence = defence
        this.dragable = dragable
        this.HTML = null
        this.canSummon = false
        this.hasShield = false
        this.generateCard()
        this.addEvents()
    }
    generateCard(){
        if(this.cardLevel === 1){
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

            if(this.hasShield){
                this.HTML.classList.add("shield")
            }
            if(this.canSummon){
                this.game.battleCry++
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
        let cards = this.DOM.querySelectorAll(".card.player")
        let tokens = this.DOM.querySelectorAll(".card.token")
        let fields = this.DOM.querySelectorAll(".field")
        let hand = this.DOM.querySelector(".field.player-hand")
        let dragedCard = ''
        

        for (let i = 0;i<cards.length;i++){

            console.log(this.game.playerCardObjects)

            let card = cards[i]
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
                   
                    field.append(dragedCard)

                    if(this.game.battleCry>0 && field.classList.contains("player-field")){
                        this.sumonCat()
                        this.game.battleCry--
                    }
                })
            
            }   
            
        }

        // ******** TOKENS ********

        for (let i = 0;i<tokens.length;i++){

            console.log(this.game.playerCardObjects)

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
        if(this.canSummon)
        this.game.playerCardObjects.push(new Card(1,1, this.DOM.querySelector('.player-field'), true, this.DOM, this.game,2))
    }
}

export default Card