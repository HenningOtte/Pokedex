async function startSearching(pokename) {
    visiblePokemon = [];
    let searchResult = getIdForPokemonName(pokename);
    if (searchResult.length > 0) {
        await searchInDetails(searchResult);
    } else {
        visiblePokemon = [];
        setTimeout(() => {
            document.getElementById('content').innerHTML = nothing_found();
        }, 50);
    }
};

function getIdForPokemonName(pokename) {
    let searchResult = [];
    for (let index = 0; index < pokemonIndex.length; index++) {
        if (pokemonIndex[index].name.match(pokename) && pokemonIndex[index].id <= amountOfCards.maxIDs) {
            searchResult.push(pokemonIndex[index].id);
        }
    }
    return searchResult;
};

async function searchInDetails(searchResult) {
    for (let i = 0; i < searchResult.length; i++) {
        let found = checkAndAddPokemon(searchResult[i]);
        if (found === false) {
            let pokemonObj = await fetchSingleCard(searchResult[i]);            
            pokemonDetails.push(pokemonObj);
            pushPokemonIfMaxID(pokemonObj);
        }
    }
};

function pushPokemonIfMaxID(pokemonObj) {
    if (pokemonObj.id <= 60) {        
        visiblePokemon.push(pokemonObj);
    }
};

function checkAndAddPokemon(result) {
    for (let index = 0; index < pokemonDetails.length; index++) {
        if (pokemonDetails[index].id === result) {
            addToVisible(pokemonDetails[index]);
            return true
        }
    }
    return false;
};

function addToVisible(pokemon) {
    if (!visiblePokemon.some(p => p.id === pokemon.id)) {
        visiblePokemon.push(pokemon);
    }
};