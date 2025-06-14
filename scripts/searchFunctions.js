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

function checkAndAddPokemon(id) {
    for (let i = 0; i < pokemonDetails.length; i++) {
        if (pokemonDetails[i].id === id) {
            pushPokemonIfMaxID(pokemonDetails[i]);
            return true;
        }
    }
    return false;
};

function pushPokemonIfMaxID(pokemonObj) {
    if (pokemonObj.id <= amountOfCards.maxIDs) {
        addToVisible(pokemonObj);
    }
};

function addToVisible(pokemon) {
    if (!visiblePokemon.some(p => p.id === pokemon.id)) {
        visiblePokemon.push(pokemon);
    }    
};

async function searchForEvolution(pokename) {
    const searchResult = getIdForEvolution(pokename);
    if (searchResult.length > 0) {
        await searchInDetails(searchResult);
    }
};

function getIdForEvolution(pokename) {
    const name = pokename.trim().toLowerCase();
    const result = [];
    for (let i = 0; i < pokemonIndex.length; i++) {
        const currentName = pokemonIndex[i].name.toLowerCase();
        if (currentName.includes(name)) {
            result.push(pokemonIndex[i].id);
        }
    }
    return result;
};