let words = []
let filtered = []
let debounceTimer

const input = document.getElementById("search")
const resultBox = document.getElementById("results")
const counter = document.getElementById("count")
const sortSelect = document.getElementById("sort")

// load dataset
fetch("words.txt")
.then(res => res.text())
.then(text => {
    words = text.split("\n")
    counter.innerText = "Database loaded: " + words.length
})

input.addEventListener("input", () => {
    clearTimeout(debounceTimer)
    debounceTimer = setTimeout(searchWords, 120)
})

sortSelect.addEventListener("change", searchWords)

function searchWords(){

let q = input.value.toLowerCase().trim()

if(!q){
resultBox.innerHTML=""
counter.innerText="0 results"
return
}

// prefix filter
filtered = words.filter(w => w.startsWith(q))

// sorting
let mode = sortSelect.value

if(mode==="az"){
filtered.sort()
}

if(mode==="short"){
filtered.sort((a,b)=>a.length-b.length)
}

if(mode==="long"){
filtered.sort((a,b)=>b.length-a.length)
}

// limit render
const limit = 300
let shown = filtered.slice(0,limit)

render(shown)

counter.innerText = filtered.length + " results (showing "+shown.length+")"
}

function render(list){

let html=""

for(let i=0;i<list.length;i++){
html += `<div class="word">${list[i]}</div>`
}

resultBox.innerHTML = html
}
