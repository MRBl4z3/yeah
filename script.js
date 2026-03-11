let words = []

const searchInput = document.getElementById("search")
const resultBox = document.getElementById("results")
const sortSelect = document.getElementById("sort")

fetch("words.txt")
.then(res=>res.text())
.then(text=>{
words = text.split("\n")
})

searchInput.addEventListener("input",searchWords)
sortSelect.addEventListener("change",searchWords)

function searchWords(){

let q = searchInput.value.toLowerCase().trim()

if(!q){
resultBox.innerHTML=""
return
}

let result = words.filter(w=>w.startsWith(q))

let mode = sortSelect.value

if(mode==="az"){
result.sort()
}

if(mode==="short"){
result.sort((a,b)=>a.length-b.length)
}

if(mode==="long"){
result.sort((a,b)=>b.length-a.length)
}

result = result.slice(0,500)

resultBox.innerHTML =
result.map(w=>`<div class="word">${w}</div>`).join("")
}
