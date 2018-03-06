function loadPage() {
    $('.modal').modal();
    $(document).on("click", ".modal-trigger", infoModal);
    getPokemones();
    // pokemonesInfo();
}

function saveDataPokemon(data) {
    if(JSON.parse(localStorage.getItem("data"))) {
        let saveData = JSON.parse(localStorage.getItem("data"));
        addPokemones(saveData);
    } else {
        getPokemones();
    }
}


function getPokemones() {
    $.ajax({
    url: `https://pokeapi.co/api/v2/pokedex/1/`
})
.done(function(data) {
    localStorage.setItem("data", JSON.stringify(data));
    saveDataPokemon(data);
})
.fail(handleError);
}


function addPokemones(saveData) {
    
    let pokemones = saveData.pokemon_entries;
    
    pokemones.forEach(element => {
        
        let pokemonId = element.entry_number;
        
        let pokemonSpeciesName = element.pokemon_species.name;
        let pokemonSpeciesURL = element.pokemon_species.url;
        paintPokemones(pokemonId, pokemonSpeciesName, pokemonSpeciesURL);
        pokemonesInfo(pokemonSpeciesURL);
    })
}

function paintPokemones(pokemonId, pokemonSpeciesName, pokemonSpeciesURL) {
    
    let $divContainer = $("#container");
    let $divRows = $("#row");
    let $divCols = $("<div />");
    let $imagePokemon = $("<img />");
    let $namePokemon = $("<p />");

    $divCols.addClass("col m2 offset-m1");
    $imagePokemon.addClass("waves-effect waves-light modal-trigger");
    $imagePokemon.attr("data-id", pokemonId);
    $imagePokemon.attr("href", "#modal1");
    $imagePokemon.attr("src", "https://dummyimage.com/100x100/000/fff");
    $namePokemon.html(pokemonSpeciesName);
    
    $divRows.append($divCols);
    $divCols.append($imagePokemon);
    $divCols.append($namePokemon);

    // pokemonesInfo(pokemonSpeciesURL);
}

function infoModal() {
    let $dataId = $(this).data("id");
    paintInfoModal($dataId);
}


function paintInfoModal($dataId) {
    let $idPokemon = $(".h2");
    $idPokemon.text($dataId);
}

function pokemonesInfo(pokemonSpeciesURL) {
    $.ajax({
        url: pokemonSpeciesURL
    })
    .done(addInfoPokemones)
    .fail(handleError);
}

function addInfoPokemones(info) {
    let habitat = info.habitat.name;
    let color = info.color.name;
    let captureRate = info.capture_rate;
    // console.log(captureRate);
    
    
}

function handleError() {
    console.log("esto es un error");
    
}

$(document).ready(loadPage);