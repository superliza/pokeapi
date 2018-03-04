function loadPage() {
    $('.modal').modal();
    getPokemones();
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
//     let hola = localStorage.getItem("data");
//     console.log(hola);
    
    
    let pokemones = saveData.pokemon_entries;
    // console.log(pokemones);
    
    pokemones.forEach(element => {
        // console.log(element.entry_number);
        
        let pokemonId = element.entry_number;
        // console.log(pokemonId);
        
        // console.log(element);
        // let pokemonSpecies = element.pokemon_species;
        // console.log(pokemonSpecies);
        
        let pokemonSpeciesName = element.pokemon_species.name;
        let pokemonSpeciesURL = element.pokemon_species.url;
        // console.log(pokemonSpeciesURL);
//         // pokemonesInfo(pokemonSpeciesURL);
        paintPokemones(pokemonId, pokemonSpeciesName, pokemonSpeciesURL);
    })
}

function paintPokemones(pokemonId, pokemonSpeciesName, pokemonSpeciesURL) {
    
    let $divContainer = $("#container")
    let $divRows = $("#row");
    let $divCols = $("<div />");
    let $imagePokemon = $("<img />");
    let $namePokemon = $("<p />");

    $divCols.addClass("col m2 offset-m1");
    $imagePokemon.addClass("waves-effect waves-light modal-trigger");
    $imagePokemon.attr("data-id", pokemonId);
    $imagePokemon.attr("href", "#modal1");
    $imagePokemon.attr("src", "https://dummyimage.com/100x100/000/fff");
    // $namePokemon.attr("data-id", pokemonId);
    $namePokemon.html(pokemonSpeciesName);
    
    $divRows.append($divCols);
    $divCols.append($imagePokemon);
    $divCols.append($namePokemon);


    //modal
    // let $contentModal = $('.modal-content');
    // let $h4 = $('<h4 />');

    // // $h4.attr("data-id", pokemonId);
    // let $data = $(this).data("id");
    // $h4.text($data);
    // $contentModal.append($h4);
    infoModal()
    paintInfoModal();
}

function infoModal() {
    let $dataId = $(this).data("id");
    paintInfoModal($dataId);
}

function paintInfoModal($dataId) {
    let $contentModal = $(".modal-content");
    let $h4 = $("<h4 />");
    $h4.text($dataId);

    $contentModal.append($h4);
    infoModal()
}

// function pokemonesInfo(pokemonSpeciesURL) {
//     $.ajax({
//         url: pokemonSpeciesURL
//     })
//     .done(addInfoPokemones)
//     .fail(handleError);
// }

// function addInfoPokemones(info) {
//     console.log(info);
    
// }

function handleError() {
    console.log("esto es un error");
    
}

$(document).ready(loadPage);