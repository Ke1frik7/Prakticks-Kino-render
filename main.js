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
        }else{
            let cardError = document.querySelector(".card_error")
            cardError.classList.add("cardErrorBlock")   
            console.log(cardError)
            document.getElementById("coming").addEventListener("click", () => {
                cardError.style.opacity = '0'
            })
        }
    }
    form.addEventListener("submit", handle)
    
    let kinoCards = document.querySelector(".kino_cards")
    let selectSort = document.querySelector(".selects_sort")
    let objectSort = {
        az: function(a,b){
           if(a.title.toLowerCase() < b.title.toLowerCase()){
                return 1
           } else{
            return -1
           }
        },
        za:function(a,b){
            if(a.title.toLowerCase() < b.title.toLowerCase()){
                return -1
            }else{
                return 1
            }
        },
        rate:function(a,b){
            if(a.rate < b.rate){
                return 1
            }else{
                return -1
            }
        },
        rates:function(a,b){
            if(a.rate < b.rate){
                return -1
            }else{
                return 1
            }
        },
        no: function(a,b){
            if(a.year < b.year){
                return 1
            }else{
                return -1
            }
        },
        on:function(a,b){
            if(a.rate < b.rate){
                return -1
            }else{
                return 1
            }
        },
    }
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
            h2.id = 'title'
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
            let i  = document.createElement("i")
            i.className = "fa-regular fa-heart"
            i.style.background  = "transparent"
            let button = document.createElement("button")
            button.className = 'leo'
            button.appendChild(i)
            button.appendChild(document.createTextNode(e.title))
            button.addEventListener("click", likes)
            cardTitle.appendChild(button)
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
        let selectSortValue = selectSort.value
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
        
        filter.sort(objectSort[selectSortValue])
        console.log(filter)
        objectAylan(filter)
    }
    document.getElementById("forms").addEventListener("submit", formSub)
    objectAylan(movies)
    let objecting = {
        name : null,
        img: null,
        text: null
    }
    let local = document.querySelector(".local_div") 
    let storidge = []
    let arayem = []
    let parsen;
    function likes(e){
       let text = e.target.textContent
       let regesS = new RegExp(text, "gi")
       arayem = movies.filter((item) => item.title.match(regesS))
       for(let i = 0; i<arayem.length; i++){
        if(!storidge.includes(arayem[i].bigposter && !storidge.includes(arayem[i].title))){
            storidge.push(arayem[i].bigposter)
            storidge.push(arayem[i].title)
                objecting.name = arayem[i].title
                objecting.img = arayem[i].bigposter
                objecting.text = true                     
            }
    }
        localStorage.setItem("storage", JSON.stringify(objecting))
        console.log(localStorage.getItem("storage"))
         parsen  = JSON.parse(localStorage.getItem("storage"))
        console.log(parsen)
    }
        let h2 = document.createElement("h2")
        h2.appendChild(document.createTextNode("Like bosilgan va saqlangan kinolar"))
        local.appendChild(h2)
        let dives = document.createElement("div")
        dives.className = 'localstorage_div'
        let img = document.createElement("img")
        img.src = JSON.parse(localStorage.getItem("storage")).img
        img.className = 'localstorage_img'
        dives.appendChild(img)
        let h3 =  document.createElement("h3")
        h3.appendChild(document.createTextNode(JSON.parse(localStorage.getItem("storage")).name))
        dives.appendChild(h3)
        local.appendChild(dives)
    
        function boss(e){
        console.log(e)
        local.classList.toggle("local_div_active")    
    }
    document.querySelector(".local_diven").addEventListener("click", boss)