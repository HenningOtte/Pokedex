function preview_card(name, type, icons, id) {
    return `
        <div class="card ${type}" onclick="openDetailCard(${id})">
            <img src="./assets/pokemons/${name}.png" alt="" class="pokemon-img">
            <span class="name">#${id} ${name}</span>
            <div class="types">${icons}</div>            
        </div>
    `
};

function type(type) {
    return `<img src="./assets/icons/${type}_Icon.png" alt="" class="type ${type}-border"></img>`
};

function pokemon_detail(name, type, id) {
    return `
        <div class="pokemon-detail-card detail-${type}">
            <span class="pokemon-title">#${id} ${name}</span>
            <img src="./assets/pokemons/${name}.png" alt="" class="detail-card-img">
            <div class="info-container" id="info_container">
                <div class="detail-nav">
                    <button class="" id="main_btn" onclick="renderMain(displayedPokemon[0])">MAIN</button>
                    <button class="" id="stats_btn" onclick="renderStats(displayedPokemon[0])">STATS</button>
                    <button class="" id="evo_btn" onclick="renderEvoChain(displayedPokemon[0])">EVO CHAIN</button>
                </div>
                <div id="pokemon_info"></div>
            </div>
        </div>
    `
}

function main_infos(height, weight, experience, abillities) {
    return `
        <div class="main-specs">
            <div class="main-keys-values">
                <span>Height</span>
                <span>Weight</span>
                <span>Base experience</span>
                <span>Abilities</span>
            </div>
            <div class="main-keys-values">
                <span>: ${height} m</span>
                <span>: ${weight} kg</span>
                <span>: ${experience}</span>
                <span id="abillities">: ${abillities}</span>
            </div>
        </div>
    `
};

function stats() {
    return `
            <div class="loaded-infos" id="loaded_infos">
                <div class="main-specs">
                    <div class="stats-keys">
                        <span>hp</span>
                        <span>attack</span>
                        <span>defense</span>
                        <span>special-attack</span>
                        <span>special-defense</span>
                        <span>speed</span>
                    </div>
                    <div class="loading-bars">
                        <div class="loading-bar" id="hp">
                            <div class="progress"></div>
                        </div>
                        <div class="loading-bar" id="attack">
                            <div class="progress"></div>
                        </div>
                        <div class="loading-bar" id="defense">
                            <div class="progress"></div>
                        </div>
                        <div class="loading-bar" id="special_attack">
                            <div class="progress"></div>
                        </div>
                        <div class="loading-bar" id="special_defense">
                            <div class="progress"></div>
                        </div>
                        <div class="loading-bar" id="speed">
                            <div class="progress"></div>
                        </div>
                    </div>
                </div>
            </div>
    `
};

function evo_chain() {
    return ` <div class="evo-chain" id="evo_chain"></div>`
};

function evo_step(name, id) {
    return `
        <div class="evo-step" id="evo_step">
            <img src="./assets/pokemons/${name}.png" alt="" class="evo-form-pic">
            <div class="evo-infos">
                <span>#${id}</span>
                <span>${name}</span>
                <div class="evo-icons" id="evo_icons_${id}"></div>
            </div>
        </div>
    `
};

function nothing_found() {
    return `
        <div class="nothing-found">
            <span>uuuups, nothing found</span>
        </div>
    `
};