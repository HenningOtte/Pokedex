function createPokemonIndex(id, name) {
    return {
        'id': id,
        'name': name,
    };
};

function createPokemonObj(responce, abilities, stats, types, evolution) {
    return {
        'abilities': abilities,
        'base_experience': responce.base_experience,
        'height': responce.height,
        'id': responce.id,
        'name': responce.name,
        'weight': responce.weight,
        'stats': stats,
        'types': types,
        'evolution_chain': evolution
    };
};

async function init() {
    loadingSpinner();
    await loadData();
    loadingSpinner();
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
        loadCurrentIds();

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
    toggleScrolling();
    toggleGallery();
    const cardsContainer = document.getElementById('cards_container');
    cardsContainer.innerHTML = '';
    displayedPokemon = [];
    loadDetailCard(id);
    setNavigationButtonIndex(id);
    toggleScale()
};

function setNavigationButtonIndex(id) {
    for (let index = 0; index < visiblePokemon.length; index++) {
        if (visiblePokemon[index].id === id) {
            document.getElementById('btn_gallery_left').onclick = function () { nextCard(index - 1) };
            document.getElementById('btn_gallery_right').onclick = function () { nextCard(index + 1) };
            break;
        }
    }
};


function nextCard(index = -1) {
    const cardsContainer = document.getElementById('cards_container');
    if (index < 0 || index >= visiblePokemon.length) return;
    cardsContainer.innerHTML = '';
    displayedPokemon = [];
    loadDetailCard(visiblePokemon[index].id);
    setNavigationButtonIndex(visiblePokemon[index].id);
    toggleScale()
};

function loadDetailCard(id) {
    const cardsContainer = document.getElementById('cards_container');
    for (let index = 0; index < pokemonDetails.length; index++) {
        const pokemon = pokemonDetails[index];
        if (id === pokemon.id) {
            isEvolutionComplete(pokemon.evolution_chain);
            displayedPokemon.push(pokemon);
            cardsContainer.innerHTML += pokemon_detail(pokemon.name, pokemon.types[0], pokemon.id);
            renderMain(displayedPokemon[0]);
            pokeID = index;
            break;
        }
    }
};

function checkDetailsLoaded(pokemon) {
    for (let index = 0; index < pokemonDetails.length; index++) {
        if (pokemonDetails[index].id === pokemon.id) {
            return index;
        };
    };
    return undefined;
};

async function isEvolutionComplete(evolution) {
    for (let index = 0; index < evolution.length; index++) {
        await searchForEvolution(evolution[index]);
    };
};

async function checkForInputAndSearch(value) {
    visiblePokemon = [];
    maxInpt(value);
    if (value.length <= 0) {
        visiblePokemon = [];
        loadCurrentIds();
        renderPreviewCards();

    } else if (value.length > 2) {
        await startSearching(value);
        renderPreviewCards();
    };
};

function maxInpt(value) {   
    const maxInpt = document.getElementById('max_inpt');
    if (value.length < 3) {
        maxInpt.innerHTML = 'Min. 3 letters to search';
    } else {
        maxInpt.innerHTML = '';
    }
};

function inputFocusout() {
    const maxInpt = document.getElementById('max_inpt');
    maxInpt.innerHTML = '';
};

function loadCurrentIds() {
    pokemonDetails.forEach((pokemon) => {
        if (pokemon.id <= amountOfCards.amount) {
            visiblePokemon.push(pokemon);
        };
    });
};

async function loadMore() {
    if (amountOfCards.amount >= amountOfCards.maxIDs) return;
    expandCardRange();
    idsNotFound = getNotFoundCardIds(pokemonDetails, amountOfCards.start, amountOfCards.amount);
    loadingSpinner()
    try {
        await loadIds(idsNotFound);
        visiblePokemon = [];
        loadingSpinner()
        reloadVisiblePokemon(amountOfCards.amount);
        renderPreviewCards();
    } catch (error) {
        console.error(error);
    };
};

function expandCardRange() {
    amountOfCards.amount += amountOfCards.loadIncrement;
    amountOfCards.start += amountOfCards.loadIncrement;
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
};

async function fetchSingleCard(id) {
    let evolutionArr = await fetchSingleEvolutionArray(id, BASE_URL);
    const path = `pokemon/${id}/`;
    const responce = await fetch(BASE_URL + path);
    const responseToJson = await responce.json();
    const pokemonObj = createPokemonObj(
        responseToJson,
        filterAbilities(responseToJson.abilities),
        filterStats(responseToJson.stats),
        filterTypes(responseToJson.types),
        evolutionArr[0]
    );
    return pokemonObj;
};

async function fetchSingleEvolutionArray(id, BASE_URL) {
    let evolutionArr = [];
    const path = `pokemon-species/${id}`;
    const responce = await fetch(BASE_URL + path);
    const responseToJson = await responce.json();
    evolutionArr.push(await filterEvolutionChain(responseToJson.evolution_chain.url))
    return evolutionArr;
};