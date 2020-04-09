class Card{
    constructor(attack, defence, target, dragable, DOM, game){
        this.game = game
        this.DOM = DOM;
        this.target = target
        this.attack = attack
        this.defence = defence
        this.dragable = dragable
        this.HTML = null
        this.generateCard()
        this.addEvents()
    }
    generateCard(){    

        this.HTML = `<div class="card" draggable="${this.dragable}">
                        <div class="card-footer">
                            <div class="stat-box attack">${this.attack}</div>
                            <div class="stat-box defence">${this.defence}</div>
                        </div>
                    </div>`
        this.target.insertAdjacentHTML("beforeend", this.HTML )
    }
    addEvents(){
        let cards = this.DOM.querySelectorAll(".card")
        let fields = this.DOM.querySelectorAll(".field")
        let hand = this.DOM.querySelector(".field.player-hand")
        let dragedCard = ''
        let game = this.game
        let newCard = this.HTML
        for (let i = 0;i<cards.length;i++){
            let card = cards[i]
            card.addEventListener("dragstart", function(e){
                dragedCard = e.target
                setTimeout(function(){
                    card.classList.add("hidden")
                },0)
            })
            card.addEventListener("dragend", function(e){
                setTimeout(function(){
                    card.classList.remove("hidden")
                    card.setAttribute("draggable", false)
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
}

export default Card