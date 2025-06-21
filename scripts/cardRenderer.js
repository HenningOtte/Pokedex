function renderPreviewCard(name, types, id) {
    let content = document.getElementById('content');
    content.innerHTML += preview_card(
        name,
        types[0],
        createTypeIcons(types),
        id
    );
};

function renderPreviewCards() {
    let content = document.getElementById('content');
    content.innerHTML = '';
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

function createTypeIcons(types) {
    let icons = '';
    types.forEach((item) => {
        icons += type(item);
    });
    return icons;
};

function renderMain(pokemon) {
    const info_container = document.getElementById('pokemon_info');
    let abiString = abilitiesAsString(pokemon.abilities);
    info_container.innerHTML = main_infos(
        (pokemon.height) / 10,
        (pokemon.weight) / 10,
        pokemon.base_experience,
        abiString
    );
    btnDatailNav('main_btn');
};

function renderStats(pokemon) {    
    const info_container = document.getElementById('pokemon_info');
    info_container.innerHTML = stats(pokemon.types[0]);
    const progess = document.getElementsByClassName('progress');
    const keys = Object.keys(maxValues);
    for (let index = 0; index < progess.length; index++) {
        let newWidth = Math.ceil(((184 / maxValues[keys[index]]) * pokemon.stats[index]));
        setTimeout(() => {
            progess[index].style.width = `${newWidth}px`;
        }, 20);
    };
    btnDatailNav('stats_btn');
};

function renderEvoChain(pokemon) {
    const info_container = document.getElementById('pokemon_info');
    info_container.innerHTML = evo_chain();
    renderEvoStep(pokemon);
    btnDatailNav('evo_btn');
};

function renderEvoStep(pokemon) {
    let evoChain = document.getElementById('evo_chain');
    pokemon.evolution_chain.forEach((name) => {
        for (let index = 0; index < pokemonDetails.length; index++) {
            if (name === pokemonDetails[index].name) {
                evoChain.innerHTML += evo_step(pokemonDetails[index].name, pokemonDetails[index].id);
                importEvoIcons(pokemonDetails[index]);
            };
        };
    });
};

function importEvoIcons(pokemon) {
    let typesString = createTypeIcons(pokemon.types);
    let evoIcons = document.getElementById(`evo_icons_${pokemon.id}`);
    evoIcons.innerHTML += typesString;
};

function btnDatailNav(key) {
    const btnNav = ['main_btn', 'stats_btn', 'evo_btn'];
    btnNav.forEach((idBtn) => {
        const btn = document.getElementById(idBtn);
        if (key === idBtn) {
            btn.classList.add('btn_aktiv');
        } else btn.classList.remove('btn_aktiv');
    });
};

function abilitiesAsString(abilities) {
    let abilitiesString = '';
    for (let index = 0; index < abilities.length; index++) {
        abilitiesString += abilities[index];
        if (index >= abilities.length - 1) break;
        abilitiesString += ', ';
    };
    return abilitiesString;
};