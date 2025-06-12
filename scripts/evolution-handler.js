async function isEvolutionComplete(evolution) {
    for (let index = 0; index < evolution.length; index++) {
        await searchForEvolution(evolution[index]);
    };
};

async function searchForEvolution(pokename) {
    let searchResult = getIdForEvolution(pokename);
    if (searchResult.length > 0) {
        await searchInDetails(searchResult);
    };
};

function getIdForEvolution(pokename) {
    let searchResult = [];
    for (let index = 0; index < pokemonIndex.length; index++) {
        if (pokemonIndex[index].name.match(pokename)) {
            searchResult.push(pokemonIndex[index].id);
        };
    };
    return searchResult;
};