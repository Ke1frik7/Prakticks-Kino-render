let kino = document.querySelector(".kino")
let select = document.querySelector("#select")
let inputSub = document.querySelector(".forms_input")
window.addEventListener("load", () => {
    let loader  = document.querySelector(".load")
    let element = document.querySelector(".element")
    setTimeout(() =>{
        loader.classList.add("opacity")
        setTimeout(() => {
           loader.classList.add("none") 
            element.classList.add("block")
        }, 500)
    }, 1000)
})
let form = document.getElementById("form")
    let result = []
    let input= document.getElementById("input")
    let input2 = document.getElementById("input_email")
    let input3 = document.getElementById("input_parol")
    let cardAlign = document.querySelector(".card")
    function handle(e){
        e.preventDefault()
        let value1 = input.value
        let value2 = input2.value
        let value3 = input3.value
        console.log(e)
        console.log("ishladi")    
        result = [...result, value1, value2, value3]
        if(result.includes("Shohijahon")&&result.includes("shohijahonmusinkulov@gmail.com")&& result.includes("82850406m") ){
            let parent = document.querySelector(".parents") 
            setTimeout(() => {
                cardAlign.style.display = 'flex'
                setTimeout(() => {
                    parent.remove()
                    kino.classList.add("kinoBlock")
                }, 1000)
            }, 100)
            console.log(true)
        }
    }
    form.addEventListener("submit", handle)
    
    let kinoCards = document.querySelector(".kino_cards")
    function objectAylan(obj){
        kinoCards.innerHTML = null
        obj.map((e) => {
            // console.log(e)
            let card = document.createElement("div")
            card.className = 'kino_card'
            kinoCards.appendChild(card)
            let kinoImg = document.createElement("img")
            kinoImg.classList.add("kino_card_img")
            kinoImg.src = e.bigposter
            card.appendChild(kinoImg)
            let cardTitle = document.createElement("div")
            cardTitle.className = 'kino_card_title'
            card.appendChild(cardTitle)
            let h2  = document.createElement("h2")
            h2.appendChild(document.createTextNode(e.title))
            cardTitle.appendChild(h2)
            let h3 = document.createElement("h3")
            h3.appendChild(document.createTextNode(e.year))
            cardTitle.appendChild(h3)
            let  p = document.createElement("p")
            p.appendChild(document.createTextNode(`This it's film ${e.title} and this film is distingguished by the fact that it caused a lot of controversy`))
            cardTitle.appendChild(p)
            let btn = document.createElement("button")
            let a = document.createElement("a")
            a.target = '_blank'
            a.href = e.trailer
            a.appendChild(document.createTextNode(`Trailer film ${e.title}`))
            btn.appendChild(a)
            cardTitle.appendChild(btn)
        })
    }
    let results = []
    function cate(arr){
        for(let i = 0; i<arr.length; i++){
            let categories = arr[i].categories
            for(let i = 0; i<categories.length; i++){
                results = [...results, categories[i]]
            }
        }
    }
    cate(movies)
    console.log(results)
    // let sorts = results.sort()
    function optionCreate(arr){
        for(let i = 0; i<arr.length; i++){
            let option = document.createElement("option")
            option.appendChild(document.createTextNode(arr[i]))
            option.value = arr[i]
            select.appendChild(option)
        }
    }
    optionCreate(results)
    function formSub(e){
        console.log(e)
        e.preventDefault()
        let optionValue = select.value
        let filter = []
        if(optionValue == "all"){
            filter = movies
        }else if(optionValue !=="all"){
            filter = movies.filter((item) => item.categories.includes(optionValue))
        }
        console.log(filter)
        let inputValue = inputSub.value
        let rejex = new RegExp(inputValue, "gi")
        filter = filter.filter((item) => item.title.match(rejex))
        objectAylan(filter)
    }
    document.getElementById("forms").addEventListener("submit", formSub)
    objectAylan(movies)