let kino = document.querySelector(".kino")
let select = document.querySelector("#select")
let inputSub = document.querySelector(".forms_input")
let carusel = document.querySelector(".container_carusel")
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
                    carusel.classList.add("caruselBlock")
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
        img.src = JSON.parse(localStorage.getItem("storage"))
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
    // let limit = 3
    // let page = 1
    // console.log(movies.length) // 12 page va 12 ni 3 ga bulinadigan bulsak 4 ta page qoladi ... 
    // let maximal = Math.ceil(movies.length / limit) // 3 ga bulinmagan taqdirda ham qoldiqli bulgan taqdirda ham ceil tugirlab beradi a'ni butun son qilib ... 
    // let pagesText = document.getElementById("pages_text")
    // let ii = document.getElementById("pages")
    // function btns(e){
    //     page++
    //     pagesText.textContent = page
      
    //     if(page <= maximal){ // 4 tagacha borsin page lar deyilgan ya'ni 0 dan 4 gacha oshib borhuncha ....
    //         objectAylan(movies.slice(limit*(page-1), limit*page))
    //         // 3 *(3 ya'ni oshib borganda ) 3-1) = 6 buladi ... va 3 * 3 = 9 )
    //         // 6 dan 9 gacha boradi ... ya'ni 6-kinodan 9-kinogacha ... 
    //     }else{
    //         pagesText.textContent = "Page lar soni tugadi"
    //         ii.redeonly= true
    //     }
    // }
    // objectAylan(movies.slice(0,3))

    // document.getElementById("pages").addEventListener("click", btns)

    // Boshidan .. 
    let kinolarSoni = 3 // tadan bulsin
    let pages = 1
    let max = movies.length / kinolarSoni
    let pageBtn = document.getElementById("pages").addEventListener("click", btns)
    let pagesText = document.getElementById("pages_text")
    let editBtn = document.getElementById("edit").addEventListener("click", editCount)
    function btns(){
        pages ++
        pagesText.textContent = pages
        if(pages <= max){
            objectAylan(movies.slice(kinolarSoni * (pages-1), (kinolarSoni * pages)))
        }else{
            pagesText.textContent  = 'Page lar soni tugadi ... '
            pageBtn.disabled = true
        }
    }
    function editCount(){
        pages--
        if(pages >= 1){
            objectAylan(movies.slice(kinolarSoni * (pages-1), (kinolarSoni * pages)))
        }else {
            editBtn.disabled = true
        }
    }


    let rasmlarArray = []
    let textlarArray = []
    let images = document.querySelector(".images")
    let right = document.getElementById("right")
    let left  = document.getElementById("left")
    function rasm(arr){
        for(let i = 0; i<arr.length; i++){
            if(!rasmlarArray.includes(arr[i].bigposter)){
                rasmlarArray = [...rasmlarArray, arr[i].bigposter, ]
                textlarArray = [...textlarArray, arr[i].title]
            }else{
                console.log(false)
            }
        }
        for(let i = 0; i<rasmlarArray.length; i++){
            console.log(rasmlarArray[i])
            let image = document.createElement("img")
            image.src = rasmlarArray[i]
            images.appendChild(image)
        }
        for(let i = 0; i<textlarArray.length; i++){
            let h3  = document.createElement("h3")
            h3.appendChild(document.createTextNode(textlarArray[i]))
            images.appendChild(h3)
        }
        let index = 0
        let imgs = document.querySelectorAll(".images img")
        function change(){
            if(index > imgs.length-1){
                index=  0
            }else if(index < 0){
                index = imgs.length-1
            }
            images.style.transform = `translate(${index * -500}px)`
        }
        right.addEventListener("click", () => {
            index++
            change()
        })
        left.addEventListener("click", () => {
            index--
            change()
        })
        setInterval(() => {
            index++
            change()
        }, 2000)
    }
    rasm(movies)