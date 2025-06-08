async function filterEvolutionChain(url) {
    const responce = await fetch(url);
    const responseToJson = await responce.json();
    let evolutionArr = [];
    evolutionArr.push(responseToJson.chain.species.name);
    if (checkEvolution(responseToJson.chain.evolves_to)) return evolutionArr;
    evolutionArr.push(responseToJson.chain.evolves_to[0].species.name);
    if (checkEvolution(responseToJson.chain.evolves_to[0].evolves_to)) return evolutionArr;
    evolutionArr.push(responseToJson.chain.evolves_to[0].evolves_to[0].species.name);
    return evolutionArr;
};

function checkEvolution(evolution) {
    return evolution.length <= 0 ? false : true;
};

function filterAbilities(abilities) {
    let abilitiesArr = [];
    abilities.forEach((item) => {
        abilitiesArr.push(item.ability.name);
    });
    return abilitiesArr;
};

function filterStats(stats) {
    let statsArr = [];
    stats.forEach((item) => {
        statsArr.push(item.base_stat);
    });
    return statsArr;
};

function filterTypes(types) {
    let typesArr = [];
    types.forEach((item) => {
        typesArr.push(item.type.name);
    });
    return typesArr;
};