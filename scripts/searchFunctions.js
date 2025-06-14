async function startSearching(value) {
    let pokename = value.toLowerCase();
    let searchResult = getIdForPokemonName(pokename);
    if (searchResult.length > 0) {
        let notFound = searchMissingPokemonInDetails(searchResult);
        if (notFound.length > 0) {
            await loadMissingDetailCards(notFound);
        }
        searchToVisible(searchResult);
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

function searchMissingPokemonInDetails(pokeID) {
    let notFound = [];
    pokeID.forEach(id => {
        let found = false;
        for (let index = 0; index < pokemonDetails.length; index++) {
            if (pokemonDetails[index].id === id) {
                found = true;
                break;
            }
        }
        if (found === false) {
            notFound.push(id);
        }
    });
    return notFound;
};

async function loadMissingDetailCards(notFound) {
    for (let index = 0; index < notFound.length; index++) {
        try {
            let pokemonObj = await (fetchSingleCard(notFound[index]));
            pokemonDetails.push(pokemonObj);
        } catch (error) {
            console.error(error);
        }
    };
};

function searchToVisible(searchResult) {
    visiblePokemon = [];
    searchResult.forEach((id) => {
        for (let index = 0; index < pokemonDetails.length; index++) {
            if (pokemonDetails[index].id === id) {
                visiblePokemon.push(pokemonDetails[index]);
            }
        }
    });
};


async function searchForEvolution(pokename) {
    let searchResult = getIdForEvolution(pokename);
    if (searchResult.length > 0) {
        let notFound = searchMissingPokemonInDetails(searchResult);
        if (notFound.length > 0) {
            await loadMissingDetailCards(notFound);
        }
    } else return
};



function getIdForEvolution(pokename) {
    let searchResult = [];
    pokename.forEach((pokename) => {
        for (let index = 0; index < pokemonIndex.length; index++) {
            if (pokename === pokemonIndex[index].name) {
                searchResult.push(pokemonIndex[index].id);
            }
        }
    });
    return searchResult;
};