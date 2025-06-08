let BASE_URL = `https://pokeapi.co/api/v2/`;
let pokemonIndex = [];
let visiblePokemon = [];
let pokemonDetails = [];
let limit = 24;
let amountOfCards = {
    'start': 0,
    'amount': limit,
};
let maxValues = {
    'hp': 255,
    'attack': 190,
    'defense': 230,
    'special_attack': 192,
    'special_defense': 200,
    'speed': 200
};

async function init() {
    await loadData();
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
    const path = `pokemon?limit=${limit}&offset=0`;
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

function renderPreviewCards() {
    let content = document.getElementById('content');
    visiblePokemon.forEach((pokemon) => {
        let index = checkDetailsLoaded(pokemon);
        if (index !== undefined) {
            renderPreviewCard(
                pokemonDetails[index].name,
                pokemonDetails[index].types,
                pokemonDetails[index].id
            );
        };
    });
};

function checkDetailsLoaded(pokemon) {
    for (let index = 0; index < pokemonDetails.length; index++) {
        if (pokemonDetails[index].id === pokemon.id) {
            return index;
        };
    };
    console.error('checkDetailsLoaded: ID not found in: "pokemonDetails[]"!');
    return undefined;
};