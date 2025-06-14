async function startSearching(pokename) {
    visiblePokemon = [];
    const searchResult = getIdForPokemonName(pokename);

    if (searchResult.length > 0) {
        await searchInDetails(searchResult);
    } else {
        document.getElementById('content').innerHTML = nothing_found();
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
    const loadPromises = searchResult.map(async id => {
        const found = checkAndAddPokemon(id);

        if (!found) {
            const pokemonObj = await fetchSingleCard(id);
            pokemonDetails.push(pokemonObj);
            pushPokemonIfMaxID(pokemonObj);
        }
    });

    await Promise.all(loadPromises);
};

function pushPokemonIfMaxID(pokemonObj) {
    if (pokemonObj.id <= 60) {
        visiblePokemon.push(pokemonObj);
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

function addToVisible(pokemon) {
    if (!visiblePokemon.some(p => p.id === pokemon.id)) {
        visiblePokemon.push(pokemon);
    }
};

function pushPokemonIfMaxID(pokemonObj) {
    if (pokemonObj.id <= amountOfCards.maxIDs) {
        addToVisible(pokemonObj);
    }
};

async function searchForEvolution(pokename) {
    let searchResult = getIdForEvolution(pokename);
    if (searchResult.length > 0) {
        await searchInDetails(searchResult);
    }
};

function getIdForPokemonName(pokename) {
    let searchResult = [];
    for (let i = 0; i < pokemonIndex.length; i++) {
        if (
            pokemonIndex[i].name.toLowerCase().includes(pokename.toLowerCase()) &&
            pokemonIndex[i].id <= amountOfCards.maxIDs
        ) {
            searchResult.push(pokemonIndex[i].id);
        }
    }
    return searchResult;
};

function getIdForEvolution(pokename) {
    let searchResult = [];
    for (let i = 0; i < pokemonIndex.length; i++) {
        if (pokemonIndex[i].name.toLowerCase().includes(pokename.toLowerCase())) {
            searchResult.push(pokemonIndex[i].id);
        }
    }
    return searchResult;
};