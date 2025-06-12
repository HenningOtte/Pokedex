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