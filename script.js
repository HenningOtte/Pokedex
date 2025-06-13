async function init() {
    loadingSpinner()
    await loadData();
    loadingSpinner()
    renderPreviewCards();
};

async function loadData() {
    await usePromise()
};

async function usePromise() {
    try {
        await loadPokemonIndex();
        let evolutionArray = await createEvolutionArr(amountOfCards.start, amountOfCards.amount);
        await loadPokemonDetails(amountOfCards.start, amountOfCards.amount, evolutionArray);
        
    } catch (error) {
        console.error(error);
    }
};

async function loadPokemonIndex() {
    if (pokemonIndex.length > 0) return;
    const path = `pokemon?limit=${amountOfCards.maxIndex}&offset=0`;
    const responce = await fetch(BASE_URL + path);
    const responseToJson = await responce.json();

    responseToJson.results.forEach((item) => {
        let pokemonID = Number(item.url.slice(34, -1));
        pokemonIndex.push({
            'id': pokemonID,
            'name': item.name,
        });
    });
    visiblePokemon = pokemonIndex;
};

async function loadPokemonDetails(start, amount, evolutionArr) {
    let counter = 0;
    for (let index = start; index < start + amount; index++) {
        const path = `pokemon/${pokemonIndex[index].id}/`;
        const responce = await fetch(BASE_URL + path);
        const responseToJson = await responce.json();
        pokemonDetails.push(createPokemonObj(
            responseToJson,
            filterAbilities(responseToJson.abilities),
            filterStats(responseToJson.stats),
            filterTypes(responseToJson.types),
            evolutionArr[counter]
        ));
        counter++;
    };
};

async function loadEvolutionURL(id) {
    const path = `pokemon-species/${id}`;
    const responce = await fetch(BASE_URL + path);
    const responseToJson = await responce.json();
    const evolutionURL = responseToJson.evolution_chain.url;
    let evolutionArr = await filterEvolutionChain(evolutionURL);
    return evolutionArr;
};

async function createEvolutionArr(start, amount) {
    let evolutionArr = [];
    for (let index = start; index < start + amount; index++) {
        const path = `pokemon-species/${pokemonIndex[index].id}`;
        const responce = await fetch(BASE_URL + path);
        const responseToJson = await responce.json();
        evolutionArr.push(await filterEvolutionChain(responseToJson.evolution_chain.url))
    };
    return evolutionArr;
};

async function openDetailCard(id) {
    toggleClasses();
    displayedPokemon = [];
    const gallery = document.getElementById('gallery');
    gallery.classList.toggle('d-none');
    pokemonDetails.forEach((pokemon) => {
        if (id === pokemon.id) {
            isEvolutionComplete(pokemon.evolution_chain);            
            displayedPokemon.push(pokemon);
            gallery.innerHTML = '';
            gallery.innerHTML = pokemon_detail(pokemon.name, pokemon.types[0], pokemon.id);
            renderMain(displayedPokemon[0]);
            return;
        };
    });
};;

function checkDetailsLoaded(pokemon) {
    for (let index = 0; index < pokemonDetails.length; index++) {
        if (pokemonDetails[index].id === pokemon.id) {
            return index;
        };
    };
    return undefined;
};

async function checkForInputAndSearch(value) {
    if (value.length <= 0) {
        visiblePokemon = [];
        importOldIds();
        renderPreviewCards();

    } else if (value.length > 2) {
        visiblePokemon = [];
        await startSearching(value);
        renderPreviewCards();
    };
};

function importOldIds() {
    pokemonDetails.forEach((pokemon) => {
        if (pokemon.id <= amountOfCards.amount) {
            visiblePokemon.push(pokemon);
        };
    });
};

async function loadMore() {
    if (amountOfCards.amount >= amountOfCards.maxIDs) return;
    amountOfCards.amount += amountOfCards.loadIncrement;
    amountOfCards.start += amountOfCards.loadIncrement;
    idsNotFound = getNotFoundCardIds(pokemonDetails, amountOfCards.start, amountOfCards.amount);
    await loadIds(idsNotFound);
    visiblePokemon = [];
    reloadVisiblePokemon(amountOfCards.amount);
    renderPreviewCards();
};

function getNotFoundCardIds(pokemonDetails, start, end) {
    let idsNotFound = [];
    for (let i = start; i <= end; i++) {
        let pokemonFound = pokemonDetails.find(pokemon => pokemon.id === i);
        if (!pokemonFound) {
            idsNotFound.push(i);
        };
    };
    return idsNotFound;
};

async function loadIds(idsNotFound) {
    for (let index = 0; index < idsNotFound.length; index++) {
        let pokemonObj = await fetchSingleCard(idsNotFound[index]);
        pokemonDetails.push(pokemonObj);
    };
};

function reloadVisiblePokemon(end) {
    for (let i = 0; i <= end; i++) {
        pokemonDetails.forEach((pokemon) => {
            if (pokemon.id === i) {
                visiblePokemon.push(pokemon);
            };
        });
    };
};;