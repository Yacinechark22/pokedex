let IdSearch = 1;

const pokeName = document.querySelector("#pokeName");
const pokeType = document.querySelector("#pokeType");
const bgId = document.querySelector("#bgId");
const pokeImg = document.querySelector("#pokeImg");
const pokeTypeImg = document.querySelector("#pokeTypeImg");
const pokeHeight = document.querySelector("#pokeHeight");
const pokeWeight = document.querySelector("#pokeWeight");
const pokeAbilities = document.querySelector("#pokeAbilities");
const pokeStats = document.querySelector("#pokeStats");


const colors = {
    fire: "#ff7402",
    grass: "#33a165",
    steel: "#00858a",
    water: "#0050ac",
    psychic: "#c90086",
    ground: "#c90086",
    ice: "#70deff",
    flying: "#5d4e75",
    ghost: "#4d5b64",
    normal: "#753845",
    poison: "#7e0058",
    rock: "#6e1a00",
    fighting: "#634136",
    dark: "#272625",
    bug: "#6e1a00",
    dragon: "#00c431",
    electric: "#bba909",
    fairy: "#d31c81",
    unknow: "#757575",
    shadow: "#29292c",
}

document.querySelector('#shuffle').addEventListener('click', () => {
    fadeOutPokemon();

    IdSearch = Math.floor(Math.random() * 898) + 1;
    fetchPokemon(IdSearch);
});

document.querySelector('#gonext').addEventListener('click', () => {
    fadeOutPokemon();

    IdSearch++;
    fetchPokemon(IdSearch);

});

document.querySelector('#goprev').addEventListener('click', () => {

    if (IdSearch > 1) {
        fadeOutPokemon();
        IdSearch--
        fetchPokemon(IdSearch, true);
    }

})
pokeImg.style.setProperty('--animate-duration', '.8s');

function fadeOutPokemon() {
    pokeImg.classList.remove("animate__fadeInDown")
    pokeImg.classList.add("animate__fadeOutDown")
}

function fadeInPokemon() {
    pokeImg.classList.remove("animate__fadeOutDown")
    pokeImg.classList.add("animate__fadeInDown")
}


function fetchPokemon(id, isPrev = false) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then(response => response.json())
        .then(data => {
            setTimeout(() => {
                replaceContent(data);
                fadeInPokemon();
            }, "500")
        });
};


function replaceContent(data) {
    // Stock la valeur "grass", "fire"...
    const pokeTypeValueFromAPI = data.types[0].type.name;
    pokeName.textContent = data.name;
    pokeType.textContent = pokeTypeValueFromAPI;
    pokeImg.src = "assets/pokemon/" + IdSearch + ".png"
    pokeTypeImg.src = "assets/type/" + pokeTypeValueFromAPI + ".svg"
    bgId.textContent = formateNumber(IdSearch);
    pokeHeight.textContent = getCorrectValue(data.height) + "M"
    pokeWeight.textContent = getCorrectValue(data.weight) + "KG"

    const allAbilities = data.abilities.map(e => e = e.ability.name);
    pokeAbilities.textContent = allAbilities.join(', ')

    document.body.style.background =  `linear-gradient(180deg, rgba(255, 255, 255, 0.63) 0%, rgba(0, 0, 0, 0.63) 100%), ${colors[pokeTypeValueFromAPI]}`

    const statsValueFromAPI = data.stats.slice(0,3);

    pokeStats.innerHTML = "";

    statsValueFromAPI.forEach(el => {
        console.log(el);
        pokeStats.innerHTML += `<div class="pb-4 row align-items-center">
        <span class="text-capitalize col-4 col-lg-3 m-0">${el.stat.name}</span>
        <div class="progress p-0 col-7 col-lg-8 bg-transparent" role="progressbar" aria-label="Basic example" aria-valuenow="${el.base_stat}" aria-valuemin="0" aria-valuemax="150">
            <div class="progress-bar animate__animated animate__slideInLeft bg-white" style="width: ${el.base_stat/ 2}%;"></div>
        </div>
        <h5 class="col-1 text-end m-0">${el.base_stat}</h5>
    </div>`;
    })

        

    
}



function getCorrectValue(value) {
    if (value < 10) {
        return "0." + value;
    } else {
        let splitted = value.toString().split('');
        splitted.splice(splitted.length-1 , 0, ".");
        return splitted.join('');
    }
}

// 1 -> #001
function formateNumber(number) {
    let str = "" + number
    let pad = "000"
    let ans = "#" + pad.substring(0, pad.length - str.length) + str;
    return ans;
}

fetch(`https://pokeapi.co/api/v2/pokemon/${IdSearch}`)
    .then(response => response.json())
    .then(data => {
        replaceContent(data)
    });