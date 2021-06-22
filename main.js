let getArtist = document.getElementById("artist");
let getTitle = document.getElementById("title");
let inputs = document.getElementsByTagName('input')
const button = document.querySelector("button");
button.disabled = true;
console.log(inputs)


function checkAll(){
    let allFilled = true;
    for(let i = 0; i < inputs.length; i++){
        if(inputs[i].type == "text" && inputs[i].value.length < 2){
            allFilled = false;
            warningField = document.getElementById("warningField")
            warningField.removeAttribute('class', 'hide')
            warningField.setAttribute('class', 'show')
            warningField.textContent = "Both artist and title is needed"
        }else{
            warningField.removeAttribute('class', 'show')
            warningField.setAttribute('class', 'hide')
            warningField.textContent = "";
        }
    }
    button.disabled = !allFilled;
}


[...inputs].forEach(input => input.addEventListener('keyup', (event) => {
    for(let i = 0; i < inputs.length; i++){
        if(inputs[i].type == "text"){
            inputs[i].onkeyup = checkAll;
            inputs[i].onblur = checkAll;
        }
    }
    if(event.key == "Enter"){
        button.click();
    }
}))




button.addEventListener('click', () => {
    artistSearch = getArtist.value.toUpperCase();
    titleSearch = getTitle.value.toUpperCase();
    
    fetch(`http://ianertson.com:3500/${artistSearch}/${titleSearch}`)
    .then(response => response.json()).then(data => {
        let textarea = document.getElementById("lyricstext")
        textarea.innerHTML = "";
        try { 
        let lyrics = data[0].lyrics.replace(/(\r\n|\r|\r|\n)/g, '<br />');
        let textarea = document.getElementById("lyricstext")
        textarea.innerHTML = `<div class="artistwrap"><h2>${artistSearch} <br> ${titleSearch} </h2>
        </div><div class="lyricsdiv">${lyrics}</div>`
        }catch (error){
            console.log("error")
            document.getElementById("warningField");
            warningField.setAttribute("class", "show")
            warningField.removeAttribute("class", "hide")
            warningField.textContent = "Not Found" 
        }
        document.getElementById("warningField");
        warningField.removeAttribute("class", "show");
        warningField.removeAttribute("class", "hide");
    })
   
})